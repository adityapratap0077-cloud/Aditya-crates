/**
 * TextProcessor — Smart NLP-based question generator
 * 
 * Extracts keywords, identifies key sentences, and generates
 * structured educational questions from raw chapter text.
 * No external API required — everything runs locally.
 * 
 * Generates easy-to-moderate difficulty questions.
 * Avoids person names, "define the term", and "what is" style questions.
 */

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'shall', 'can', 'need', 'dare', 'ought',
  'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from',
  'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
  'between', 'out', 'off', 'over', 'under', 'again', 'further', 'then',
  'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'both',
  'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
  'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just',
  'because', 'but', 'and', 'or', 'if', 'while', 'although', 'though',
  'about', 'up', 'down', 'that', 'this', 'these', 'those', 'it', 'its',
  'he', 'she', 'they', 'them', 'their', 'his', 'her', 'we', 'you', 'your',
  'my', 'our', 'me', 'him', 'us', 'i', 'which', 'who', 'whom', 'what',
  'also', 'any', 'many', 'much', 'well', 'get', 'got', 'like', 'make',
  'made', 'know', 'known', 'take', 'taken', 'come', 'came', 'go', 'went',
  'gone', 'see', 'seen', 'say', 'said', 'tell', 'told', 'give', 'given',
  'think', 'thought', 'find', 'found', 'become', 'became', 'let', 'put',
  'keep', 'kept', 'still', 'one', 'two', 'three', 'four', 'five',
  'however', 'therefore', 'thus', 'hence', 'since', 'until', 'unless',
  'whether', 'yet', 'even', 'ever', 'never', 'always', 'often', 'sometimes',
  'already', 'now', 'then', 'etc', 'eg', 'ie', 'vs', 'via', 'per',
  'among', 'along', 'across', 'around', 'upon', 'within', 'without',
  'towards', 'throughout', 'beside', 'besides', 'beyond', 'despite',
  'regarding', 'according', 'including', 'following', 'considering',
  'given', 'using', 'having', 'doing', 'going', 'making', 'taking',
  'thing', 'things', 'way', 'ways', 'something', 'anything', 'everything',
  'nothing', 'someone', 'anyone', 'everyone', 'people', 'person',
  'called', 'known', 'different', 'important', 'various', 'several',
  'certain', 'particular', 'specific', 'general', 'common', 'main',
  'new', 'old', 'large', 'small', 'great', 'good', 'bad', 'long',
  'short', 'high', 'low', 'first', 'last', 'next', 'able', 'due',
  // Brand & document words — must never become question keywords
  'coaching', 'abacus', 'infinity', 'worksheet', 'worksheets',
  'chapter', 'class', 'subject', 'student', 'students', 'teacher',
  'teachers', 'answer', 'answers', 'question', 'questions', 'marks',
  'mark', 'score', 'test', 'exam', 'examination', 'paper', 'page',
  'section', 'exercise', 'exercises', 'activity', 'activities',
  'instructions', 'note', 'notes', 'textbook', 'book', 'lesson',
  'lessons', 'unit', 'grade', 'school', 'name', 'date', 'roll'
]);

class TextProcessor {
  constructor(rawText) {
    this.rawText = this.cleanText(rawText);
    this.sentences = this.extractSentences();
    this.words = this.tokenize(this.rawText);
    this.wordFreq = this.computeWordFrequency();
    this.keywords = this.extractKeywords();
    this.paragraphs = this.extractParagraphs();
    this.scoredSentences = this.scoreSentences();
  }

  /** Clean raw PDF text — normalize whitespace, remove artifacts */
  cleanText(text) {
    return text
      .replace(/\r\n/g, '\n')
      .replace(/\f/g, '\n\n')
      .replace(/[^\S\n]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/(\w)-\n(\w)/g, '$1$2')
      .replace(/\n(?=[a-z])/g, ' ')
      .trim();
  }

  /** Split text into individual sentences */
  extractSentences() {
    const raw = this.rawText
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ');

    const parts = raw.split(/(?<=[.!?])\s+(?=[A-Z"])/);

    return parts
      .map(s => s.trim())
      .filter(s => {
        if (s.length < 25 || s.length > 350) return false;
        const wordCount = s.split(/\s+/).length;
        if (wordCount < 4) return false;
        if (!/[.!?]$/.test(s)) return false;
        const letterRatio = (s.match(/[a-zA-Z]/g) || []).length / s.length;
        if (letterRatio < 0.5) return false;
        return true;
      });
  }

  /** Tokenize text into lowercase words */
  tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z\s'-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 1);
  }

  /** Check if a word looks like a person's name (capitalized, not at sentence start) */
  isLikelyName(word) {
    if (!word || word.length < 2) return false;
    const clean = word.replace(/[^a-zA-Z]/g, '');
    // Single capitalized short word that isn't a common noun
    if (clean.length <= 3) return false;
    // Check if the original text has this word appearing capitalized mid-sentence
    const namePattern = new RegExp(`[a-z]\\s+${clean}\\b`, 'g');
    const midSentenceCount = (this.rawText.match(namePattern) || []).length;
    // If it appears capitalized mid-sentence often, likely a proper noun/name
    if (midSentenceCount >= 2) return true;
    // Check common name patterns
    if (/^(mr|mrs|ms|dr|prof|sir|lord|king|queen)\b/i.test(clean)) return true;
    return false;
  }

  /** Filter out person names and proper nouns from keywords */
  isGoodKeyword(word) {
    if (STOP_WORDS.has(word)) return false;
    if (word.length < 3) return false;
    // Filter out likely person names
    if (this.isLikelyName(word)) return false;
    // Filter out words that are always capitalized (proper nouns)
    const lowerCount = (this.rawText.toLowerCase().match(new RegExp(`\\b${word}\\b`, 'g')) || []).length;
    const capitalizedPattern = new RegExp(`\\b${word.charAt(0).toUpperCase() + word.slice(1)}\\b`, 'g');
    const capCount = (this.rawText.match(capitalizedPattern) || []).length;
    // If the word ONLY appears capitalized and it's short, it's likely a name
    if (capCount > 0 && lowerCount === capCount && word.length < 8) {
      // Check if it appears at sentence starts
      const sentStartPattern = new RegExp(`[.!?]\\s+${word.charAt(0).toUpperCase() + word.slice(1)}\\b`, 'g');
      const sentStartCount = (this.rawText.match(sentStartPattern) || []).length;
      if (sentStartCount < capCount * 0.5) return false; // mostly mid-sentence caps = proper noun
    }
    return true;
  }

  /** Compute word frequency map */
  computeWordFrequency() {
    const freq = {};
    for (const word of this.words) {
      if (!STOP_WORDS.has(word) && word.length > 2) {
        freq[word] = (freq[word] || 0) + 1;
      }
    }
    return freq;
  }

  /** Extract top keywords by frequency-weighted scoring, filtering names */
  extractKeywords(topN = 50) {
    const entries = Object.entries(this.wordFreq);
    const scored = entries
      .filter(([word]) => this.isGoodKeyword(word))
      .map(([word, freq]) => ({
        word,
        freq,
        score: freq * (word.length > 6 ? 3 : word.length > 4 ? 2 : 1)
      }));
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topN);
  }

  /** Extract paragraphs from raw text */
  extractParagraphs() {
    return this.rawText
      .split(/\n\n+/)
      .map(p => p.replace(/\n/g, ' ').trim())
      .filter(p => p.length > 50 && p.split(/\s+/).length > 8);
  }

  /** Score each sentence by keyword density, avoid name-heavy sentences */
  scoreSentences() {
    const keywordSet = new Set(this.keywords.map(k => k.word));
    const keywordScores = {};
    for (const k of this.keywords) {
      keywordScores[k.word] = k.score;
    }

    return this.sentences
      .filter(sentence => {
        // Skip sentences that are mostly about a specific person
        const nameHeavy = this.sentenceIsNameHeavy(sentence);
        return !nameHeavy;
      })
      .map((sentence, index) => {
        const words = this.tokenize(sentence);
        let score = 0;
        const foundKeywords = [];

        for (const word of words) {
          if (keywordSet.has(word)) {
            score += keywordScores[word] || 1;
            foundKeywords.push(word);
          }
        }

        // Bonus for conceptual sentences
        if (/\b(is|are|refers?\s+to|defined?\s+as|means?|known\s+as|consists?\s+of|includes?|involves?)\b/i.test(sentence)) {
          score *= 1.5;
        }

        // Bonus for process/how sentences
        if (/\b(process|method|steps?|procedure|technique|function|purpose|caused?\s+by|result|effect|leads?\s+to)\b/i.test(sentence)) {
          score *= 1.3;
        }

        return { sentence, index, score, foundKeywords };
      })
      .sort((a, b) => b.score - a.score);
  }

  /** Check if a sentence is mostly about a specific person */
  sentenceIsNameHeavy(sentence) {
    // Count capitalized words that aren't at the start
    const words = sentence.split(/\s+/);
    let nameCount = 0;
    for (let i = 1; i < words.length; i++) {
      const w = words[i].replace(/[^a-zA-Z]/g, '');
      if (w.length > 1 && /^[A-Z][a-z]+$/.test(w) && !STOP_WORDS.has(w.toLowerCase())) {
        // Check if it's not a common word
        const lower = w.toLowerCase();
        if (this.isLikelyName(lower)) {
          nameCount++;
        }
      }
    }
    return nameCount >= 2; // 2+ names in one sentence = too name-heavy
  }

  /** Find the best keyword to blank out in a sentence (excludes names) */
  findBlankableWord(sentence) {
    const words = sentence.split(/\s+/);
    const keywordSet = new Set(this.keywords.map(k => k.word));
    let bestWord = null;
    let bestScore = -1;

    for (const word of words) {
      const clean = word.toLowerCase().replace(/[^a-z'-]/g, '');
      if (keywordSet.has(clean) && clean.length > 3 && !this.isLikelyName(clean)) {
        const kw = this.keywords.find(k => k.word === clean);
        const score = kw ? kw.score : 0;
        if (score > bestScore) {
          bestScore = score;
          bestWord = word;
        }
      }
    }

    // Fallback: pick the longest non-stop, non-name word
    if (!bestWord) {
      const candidates = words.filter(w => {
        const clean = w.toLowerCase().replace(/[^a-z'-]/g, '');
        return clean.length > 4 && !STOP_WORDS.has(clean) && !this.isLikelyName(clean);
      });
      if (candidates.length > 0) {
        candidates.sort((a, b) => b.length - a.length);
        bestWord = candidates[0];
      }
    }

    return bestWord;
  }

  // ═══════════════════════════════════════════
  //  SECTION A: Fill in the Blanks
  // ═══════════════════════════════════════════

  generateFillInBlanks(count = 8) {
    const used = new Set();
    const results = [];

    for (const scored of this.scoredSentences) {
      if (results.length >= count) break;
      if (used.has(scored.index)) continue;

      const blankWord = this.findBlankableWord(scored.sentence);
      if (!blankWord) continue;

      const cleanAnswer = blankWord.replace(/[^a-zA-Z'-]/g, '');
      const regex = new RegExp(
        blankWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'i'
      );
      const question = scored.sentence.replace(regex, '________');

      if (question === scored.sentence) continue;

      results.push({
        question,
        answer: cleanAnswer
      });
      used.add(scored.index);
    }

    return results;
  }

  // ═══════════════════════════════════════════
  //  SECTION B: True or False
  // ═══════════════════════════════════════════

  generateTrueFalse(count = 8) {
    const factualSentences = this.scoredSentences.filter(s =>
      /\b(is|are|was|were|has|have|had|can|will|does|do)\b/i.test(s.sentence) &&
      s.foundKeywords.length >= 1
    );

    const results = [];
    const used = new Set();
    const trueCount = Math.ceil(count / 2);

    // TRUE statements
    for (const scored of factualSentences) {
      if (results.length >= trueCount) break;
      if (used.has(scored.index)) continue;

      results.push({
        statement: scored.sentence,
        answer: 'True'
      });
      used.add(scored.index);
    }

    // FALSE statements (modified)
    for (const scored of factualSentences) {
      if (results.length >= count) break;
      if (used.has(scored.index)) continue;

      const falsified = this.makeFalseStatement(scored.sentence);
      if (!falsified) continue;

      results.push({
        statement: falsified,
        answer: 'False'
      });
      used.add(scored.index);
    }

    return this.shuffleArray(results);
  }

  /** Transform a true sentence into a false one */
  makeFalseStatement(sentence) {
    // Strategy 1: Swap a keyword with another keyword
    const keywordList = this.keywords.map(k => k.word);
    const sentenceWords = this.tokenize(sentence);
    const sentenceKeywords = sentenceWords.filter(w =>
      keywordList.includes(w) && !this.isLikelyName(w)
    );

    if (sentenceKeywords.length > 0) {
      const targetKw = sentenceKeywords[0];
      const otherKeywords = keywordList.filter(k =>
        k !== targetKw && k.length >= 3 && !sentenceWords.includes(k) && !this.isLikelyName(k)
      );
      if (otherKeywords.length > 0) {
        const replacement = otherKeywords[Math.floor(Math.random() * Math.min(5, otherKeywords.length))];
        const regex = new RegExp(`\\b${targetKw}\\b`, 'i');
        return sentence.replace(regex, replacement);
      }
    }

    // Strategy 2: Negate the verb
    const negations = [
      [/\bis\b/i, 'is not'],
      [/\bare\b/i, 'are not'],
      [/\bwas\b/i, 'was not'],
      [/\bwere\b/i, 'were not'],
      [/\bcan\b/i, 'cannot'],
      [/\bhas\b/i, 'does not have'],
      [/\bhave\b/i, 'do not have'],
    ];

    for (const [pattern, replacement] of negations) {
      if (pattern.test(sentence)) {
        return sentence.replace(pattern, replacement);
      }
    }

    return null;
  }

  // ═══════════════════════════════════════════
  //  SECTION C: Match the Following
  // ═══════════════════════════════════════════

  generateMatchTheFollowing(count = 5) {
    const pairs = [];
    const definitionPatterns = [
      /^(.+?)\s+(?:is|are|was|were)\s+(?:defined as|known as|referred to as|called)\s+(.+?)\.?$/i,
      /^(.+?)\s+(?:is|are)\s+(?:a|an|the)\s+(.+?)\.?$/i,
      /^(.+?)\s+(?:refers?\s+to|means?)\s+(.+?)\.?$/i,
      /^(.+?)\s*[-–—:]\s*(.+?)\.?$/,
    ];

    for (const sentence of this.sentences) {
      if (pairs.length >= count) break;
      for (const pattern of definitionPatterns) {
        const match = sentence.match(pattern);
        if (match) {
          let left = match[1].trim();
          let right = match[2].trim();
          if (left.length > 5 && left.length < 60 && right.length > 5 && right.length < 80) {
            // Skip if left side looks like a person name
            if (this.isLikelyName(left.toLowerCase())) continue;
            left = left.charAt(0).toUpperCase() + left.slice(1);
            right = right.charAt(0).toUpperCase() + right.slice(1);
            right = right.replace(/\.$/, '');
            pairs.push({ left, right });
            break;
          }
        }
      }
    }

    // Fallback: keyword-context pairs (no names)
    if (pairs.length < count) {
      for (const scored of this.scoredSentences) {
        if (pairs.length >= count) break;
        if (scored.foundKeywords.length === 0) continue;

        const keyword = scored.foundKeywords.find(kw => !this.isLikelyName(kw));
        if (!keyword) continue;

        const displayKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);
        const sentence = scored.sentence;
        const kwIndex = sentence.toLowerCase().indexOf(keyword);
        if (kwIndex === -1) continue;

        let context = sentence.substring(kwIndex + keyword.length).trim();
        context = context.replace(/^[\s,]*(?:is|are|was|were|means?|refers?\s+to)?\s*/i, '').trim();
        if (context.length > 60) {
          context = context.substring(0, 57) + '...';
        }
        context = context.replace(/\.$/, '');

        if (context.length > 10) {
          context = context.charAt(0).toUpperCase() + context.slice(1);
          if (!pairs.some(p => p.left === displayKeyword)) {
            pairs.push({ left: displayKeyword, right: context });
          }
        }
      }
    }

    const result = pairs.slice(0, count);
    const shuffledRight = this.shuffleArray(result.map(p => p.right));

    return {
      pairs: result,
      shuffledRight
    };
  }

  // ═══════════════════════════════════════════
  //  SECTION D: Short Answer Questions
  //  (Easy-moderate, NO "what is X" or "define X")
  // ═══════════════════════════════════════════

  generateShortAnswer(count = 6) {
    const questions = [];
    const usedKeywords = new Set();

    // Easy-to-moderate templates that test understanding, not memorization
    const questionTemplates = [
      (kw) => `Why is ${kw} considered important?`,
      (kw) => `How does ${kw} work?`,
      (kw) => `What happens when ${kw} takes place?`,
      (kw) => `Give one example of ${kw}.`,
      (kw) => `List two features of ${kw}.`,
      (kw) => `What is the purpose of ${kw}?`,
      (kw) => `Where is ${kw} commonly used?`,
      (kw) => `How is ${kw} different from other types?`,
      (kw) => `What are the main parts of ${kw}?`,
      (kw) => `State one advantage of ${kw}.`,
      (kw) => `What is the function of ${kw}?`,
      (kw) => `Name any two examples related to ${kw}.`,
    ];

    for (const kw of this.keywords) {
      if (questions.length >= count) break;
      if (usedKeywords.has(kw.word)) continue;
      if (kw.word.length < 4) continue;
      if (this.isLikelyName(kw.word)) continue;

      const displayKw = kw.word.charAt(0).toUpperCase() + kw.word.slice(1);
      const templateIndex = questions.length % questionTemplates.length;
      const question = questionTemplates[templateIndex](displayKw);

      questions.push({ question, wordLimit: '30-40 words' });
      usedKeywords.add(kw.word);
    }

    return questions;
  }

  // ═══════════════════════════════════════════
  //  SECTION E: Long Answer Questions
  //  (Easy-moderate, conceptual, NO names)
  // ═══════════════════════════════════════════

  generateLongAnswer(count = 3) {
    const questions = [];
    const usedThemes = new Set();

    // Conceptual, understanding-based templates
    const longTemplates = [
      (theme) => `Explain the process of ${theme} in your own words.`,
      (theme) => `Why is ${theme} useful? Give examples to support your answer.`,
      (theme) => `Describe the main features of ${theme} and how it is applied.`,
      (theme) => `How does ${theme} affect everyday life? Explain with examples.`,
      (theme) => `Compare and contrast different aspects of ${theme}.`,
    ];

    // Use topic keywords (not names)
    const topicKeywords = this.keywords.filter(kw =>
      kw.word.length > 5 && kw.freq >= 2 && !usedThemes.has(kw.word) && !this.isLikelyName(kw.word)
    );

    for (let i = 0; i < Math.min(count, topicKeywords.length); i++) {
      const kw = topicKeywords[i];
      const displayKw = kw.word.charAt(0).toUpperCase() + kw.word.slice(1);
      const template = longTemplates[i % longTemplates.length];

      questions.push({
        question: template(displayKw),
        wordLimit: '80-100 words'
      });
      usedThemes.add(kw.word);
    }

    // Fallback: broader questions
    if (questions.length < count && this.paragraphs.length > 0) {
      const broadTemplates = [
        'Summarize the main ideas discussed in this chapter in your own words.',
        'What are the key points from this chapter? Explain each briefly.',
        'How are the different concepts in this chapter connected to each other?',
      ];
      for (let i = questions.length; i < count; i++) {
        questions.push({
          question: broadTemplates[i % broadTemplates.length],
          wordLimit: '80-100 words'
        });
      }
    }

    return questions;
  }

  // ═══════════════════════════════════════════
  //  Generate All Sections
  // ═══════════════════════════════════════════

  generateWorksheet() {
    return {
      sectionA: {
        title: 'Fill in the Blanks',
        instructions: 'Fill in the blanks with the correct word or phrase.',
        questions: this.generateFillInBlanks(8)
      },
      sectionB: {
        title: 'True or False',
        instructions: 'Write True or False for each statement.',
        questions: this.generateTrueFalse(8)
      },
      sectionC: {
        title: 'Match the Following',
        instructions: 'Match the items in Column A with the correct items in Column B.',
        data: this.generateMatchTheFollowing(5)
      },
      sectionD: {
        title: 'Short Answer Questions',
        instructions: 'Answer the following questions in 30-40 words.',
        questions: this.generateShortAnswer(6)
      },
      sectionE: {
        title: 'Long Answer Questions',
        instructions: 'Answer the following questions in 80-100 words.',
        questions: this.generateLongAnswer(3)
      }
    };
  }

  /** Fisher-Yates shuffle */
  shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

module.exports = TextProcessor;
