export interface Product {
    id: string;
    title: string;
    price: string;
    priceValue: number;
    description: string;
    imageUrl: string;
    features: string[];
    isRare?: boolean;
    category: string;
    rating: number;
    reviews: number;
    downloadUrl?: string; // Optional URL for direct download after purchase
}

export const PRODUCTS: Product[] = [
    // --- Reel Bundles (1-8) ---
    {
        id: "reel_bundle_1",
        title: "Ultimate Viral Reels Pack",
        price: "₹499",
        priceValue: 499,
        description: "Explode your engagement with 50+ high-retention reel templates.",
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
        features: ["50+ Editable Templates", "High Retention Hooks", "Trending Audio List", "Canva Compatible"],
        category: "Reel Bundles",
        rating: 4.8,
        reviews: 124,
        isRare: true
    },
    {
        id: "reel_bundle_2",
        title: "Faceless Marketing Reels",
        price: "₹399",
        priceValue: 399,
        description: "100 aesthetic videos where you don't need to show your face.",
        imageUrl: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop",
        features: ["100 Aesthetic Clips", "Nature & Lifestyle", "No Face Required", "4K Quality"],
        category: "Reel Bundles",
        rating: 4.9,
        reviews: 85
    },
    {
        id: "reel_bundle_3",
        title: "Luxury Lifestyle Pack",
        price: "₹599",
        priceValue: 599,
        description: "Showcase the high life. Cars, watches, travel, and mansions.",
        imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop",
        features: ["200+ Luxury Clips", "Copyright Free", "Motivation Focus", "HD Vertical Video"],
        category: "Reel Bundles",
        rating: 4.7,
        reviews: 210
    },
    {
        id: "reel_bundle_4",
        title: "Gym Motivation Reels",
        price: "₹449",
        priceValue: 449,
        description: "High-energy workout clips to inspire your fitness audience.",
        imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
        features: ["50 Workout Clips", "High Energy Edit", "Diverse Models", "Fitness Niche"],
        category: "Reel Bundles",
        rating: 4.8,
        reviews: 76
    },
    {
        id: "reel_bundle_5",
        title: "Dark Aesthetics Reels",
        price: "₹399",
        priceValue: 399,
        description: "Moody, cinematic clips perfect for quotes and storytelling.",
        imageUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2074&auto=format&fit=crop",
        features: ["Dark Mode Vibes", "Cinematic Color Grading", "Slow Motion", "Sad/Deep Quotes"],
        category: "Reel Bundles",
        rating: 4.6,
        reviews: 92
    },
    {
        id: "reel_bundle_6",
        title: "Travel Wanderlust Pack",
        price: "₹499",
        priceValue: 499,
        description: "Breathtaking drone shots and travel clips from around the world.",
        imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
        features: ["Drone Footage", "Beach & Mountains", "City Skylines", "Smooth Transitions"],
        category: "Reel Bundles",
        rating: 4.9,
        reviews: 156
    },
    {
        id: "reel_bundle_7",
        title: "Tech & Setup Reels",
        price: "₹449",
        priceValue: 449,
        description: "Show off clean desk setups and coding aesthetics.",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        features: ["RGB Lighting", "Minimalist Desks", "Coding Screens", "Gadget Reviews"],
        category: "Reel Bundles",
        rating: 4.7,
        reviews: 68
    },
    {
        id: "reel_bundle_8",
        title: "Food & Cooking Shorts",
        price: "₹399",
        priceValue: 399,
        description: "Delicious close-ups and cooking ASMR clips.",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop",
        features: ["4K Food Porn", "Sizzle Sounds", "Recipe Ready", "Restaurant Vibes"],
        category: "Reel Bundles",
        rating: 4.8,
        reviews: 45
    },

    // --- Canva Templates (9-16) ---
    {
        id: "canva_1",
        title: "Aesthete Brand Kit",
        price: "₹299",
        priceValue: 299,
        description: "Complete branding solution. Logos, palettes, and social posts.",
        imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=2070&auto=format&fit=crop",
        features: ["100+ Instagram Posts", "Story Templates", "Highlight Covers", "Brand Guidelines"],
        category: "Canva Templates",
        rating: 4.9,
        reviews: 89
    },
    {
        id: "canva_2",
        title: "Real Estate Pro Kit",
        price: "₹499",
        priceValue: 499,
        description: "Sell more homes with professional listing templates.",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
        features: ["Just Listed/Sold", "Open House Flyers", "Market Update Posts", "Agent Bio"],
        category: "Canva Templates",
        rating: 4.6,
        reviews: 45
    },
    {
        id: "canva_3",
        title: "The Coach's Starter Pack",
        price: "₹349",
        priceValue: 349,
        description: "Establish authority with carousel slides and testimonials.",
        imageUrl: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2069&auto=format&fit=crop",
        features: ["50 Carousel Slides", "Quote Layouts", "Client Results", "Webinar Promo"],
        category: "Canva Templates",
        rating: 4.8,
        reviews: 112
    },
    {
        id: "canva_4",
        title: "E-commerce Product Ads",
        price: "₹399",
        priceValue: 399,
        description: "Stop the scroll with high-converting ad templates.",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop",
        features: ["Sale Banners", "New Arrival", "Testimonial Grids", "Product Spotlight"],
        category: "Canva Templates",
        rating: 4.7,
        reviews: 67
    },
    {
        id: "canva_5",
        title: "Podcast Promo Kit",
        price: "₹299",
        priceValue: 299,
        description: "Promote your latest episode with audiograms and quote cards.",
        imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop",
        features: ["Audiogram Layouts", "Guest Spotlights", "Episode Quotes", "Subscribe CTAs"],
        category: "Canva Templates",
        rating: 4.5,
        reviews: 32
    },
    {
        id: "canva_6",
        title: "Restaurant Menu & Socials",
        price: "₹399",
        priceValue: 399,
        description: "Mouth-watering templates for cafes and restaurants.",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
        features: ["Digital Menu", "Food Stories", "Review Highlights", "Event Flyers"],
        category: "Canva Templates",
        rating: 4.8,
        reviews: 56
    },
    {
        id: "canva_7",
        title: "Wedding Planner Suite",
        price: "₹499",
        priceValue: 499,
        description: "Elegant templates for wedding invitations and planning.",
        imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
        features: ["Save the Date", "Invitations", "Seating Charts", "Timeline Graphics"],
        category: "Canva Templates",
        rating: 4.9,
        reviews: 78
    },
    {
        id: "canva_8",
        title: "YouTube Thumbnail Pack",
        price: "₹249",
        priceValue: 249,
        description: "Get more clicks with high-CTR thumbnail designs.",
        imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1974&auto=format&fit=crop",
        features: ["50 CTR Layouts", "Gaming & Tech", "Vlog Styles", "Reaction Faces"],
        category: "Canva Templates",
        rating: 4.7,
        reviews: 210
    },

    // --- Courses (17-21) ---
    {
        id: "course_1",
        title: "Content Mastery 101",
        price: "₹999",
        priceValue: 999,
        description: "Learn content creation, storytelling, and audience building.",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
        features: ["5 Hours of Video", "Workbook Included", "Lifetime Access", "Certificate of Completion"],
        category: "Courses",
        rating: 5.0,
        reviews: 215,
        isRare: true
    },
    {
        id: "course_2",
        title: "Canva Design Masterclass",
        price: "₹799",
        priceValue: 799,
        description: "Don't just use templates—learn to design from scratch.",
        imageUrl: "https://images.unsplash.com/photo-1611532736597-b52d2b381b12?q=80&w=2070&auto=format&fit=crop",
        features: ["Zero to Pro", "Design Theory", "Project Based", "Mobile Editing"],
        category: "Courses",
        rating: 4.9,
        reviews: 140
    },
    {
        id: "course_3",
        title: "Digital Product Blueprint",
        price: "₹1499",
        priceValue: 1499,
        description: "Explode your engagement with 50+ high-retention reel templates.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        features: ["Product Research", "Marketing Plan", "Tech Setup Guide", "Sales Funnel"],
        category: "Courses",
        rating: 4.8,
        reviews: 95
    },
    {
        id: "course_4",
        title: "Reels Viral Academy",
        price: "₹1299",
        priceValue: 1299,
        description: "Master the algorithm. How to get millions of views on Instagram.",
        imageUrl: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1974&auto=format&fit=crop",
        features: ["Algorithm Secrets", "Hook Science", "Editing Workflow", "Monetization"],
        category: "Courses",
        rating: 4.9,
        reviews: 310
    },
    {
        id: "course_5",
        title: "Freelancing Freedom",
        price: "₹1999",
        priceValue: 1999,
        description: "Quit your job and start a scalable freelance business.",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
        features: ["Client Acquisition", "Pricing Strategy", "Portfolio Building", "Contract Templates"],
        category: "Courses",
        rating: 4.7,
        reviews: 150
    },

    // --- eBooks (22-26) ---
    {
        id: "ebook_1",
        title: "The Solopreneur's Playbook",
        price: "₹199",
        priceValue: 199,
        description: "A step-by-step guide to building a one-person business.",
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
        features: ["100+ Pages", "Actionable Checklists", "Case Studies", "PDF & ePub Formats"],
        category: "eBooks",
        rating: 4.7,
        reviews: 42
    },
    {
        id: "ebook_2",
        title: "100 Killer Hooks",
        price: "₹99",
        priceValue: 99,
        description: "Never run out of ideas again. Copy-paste headlines.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=2070&auto=format&fit=crop",
        features: ["Viral Formulas", "Fill-in-the-blanks", "Platform Specific", "Psychology Explained"],
        category: "eBooks",
        rating: 4.9,
        reviews: 310,
        isRare: true
    },
    {
        id: "ebook_3",
        title: "Hashtag Strategy Secrets",
        price: "₹149",
        priceValue: 149,
        description: "Stop guessing. Learn how to research and use hashtags.",
        imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop",
        features: ["2026 Updated", "Niche Lists", "Banned Tags List", "Volume Strategy"],
        category: "eBooks",
        rating: 4.5,
        reviews: 88
    },
    {
        id: "ebook_4",
        title: "Email Marketing Gold",
        price: "₹249",
        priceValue: 249,
        description: "How to build an email list and sell on autopilot.",
        imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070&auto=format&fit=crop",
        features: ["Welcome Sequence", "Sales Emails", "Subject Lines", "Newsletter Tips"],
        category: "eBooks",
        rating: 4.8,
        reviews: 75
    },
    {
        id: "ebook_5",
        title: "Copywriting for Creators",
        price: "₹199",
        priceValue: 199,
        description: "Write captions that convert. Persuasion psychology made simple.",
        imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2073&auto=format&fit=crop",
        features: ["PAS Framework", "Storytelling", "CTA Guide", "Power Words"],
        category: "eBooks",
        rating: 4.7,
        reviews: 60
    },

    // --- AI Prompts (27-30) ---
    {
        id: "ai_1",
        title: "ChatGPT Power Prompts",
        price: "₹149",
        priceValue: 149,
        description: "Unlock the full potential of AI. 500+ curated prompts.",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
        features: ["500+ Prompts", "Copy-Paste Ready", "Updated Monthly", "Category Organized"],
        category: "AI Prompts",
        rating: 4.6,
        reviews: 156
    },
    {
        id: "ai_2",
        title: "Midjourney Art Bible",
        price: "₹249",
        priceValue: 249,
        description: "Create stunning visuals with precise style keywords.",
        imageUrl: "https://images.unsplash.com/photo-1684369175836-8344c2759809?q=80&w=2070&auto=format&fit=crop",
        features: ["Style Dictionary", "Parameter Guide", "Portrait Prompts", "Landscape Prompts"],
        category: "AI Prompts",
        rating: 4.8,
        reviews: 120
    },
    {
        id: "ai_3",
        title: "Coder's AI Assistant",
        price: "₹199",
        priceValue: 199,
        description: "Debug faster and write cleaner code with these dev-focused prompts.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
        features: ["50+ Editable Templates", "High Retention Hooks", "Trending Audio List", "Canva Compatible"],
        category: "AI Prompts",
        rating: 4.9,
        reviews: 200
    },
    {
        id: "ai_4",
        title: "SEO Blog Writer Prompts",
        price: "₹149",
        priceValue: 149,
        description: "Generate rank-ready blog posts in minutes.",
        imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop",
        features: ["Keyword Integration", "Outline Builders", "Meta Descriptions", "FAQ Generator"],
        category: "AI Prompts",
        rating: 4.5,
        reviews: 80
    },

    // --- Lightroom Presets (31-34) ---
    {
        id: "preset_1",
        title: "Moody Dark Aesthetics",
        price: "₹299",
        priceValue: 299,
        description: "Give your photos that popular dark, desaturated look.",
        imageUrl: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=2058&auto=format&fit=crop",
        features: ["10 Mobile Presets", "10 Desktop Presets", "Installation Guide", "One-Click Edit"],
        category: "Lightroom Presets",
        rating: 4.8,
        reviews: 150
    },
    {
        id: "preset_2",
        title: "Bright & Airy Pack",
        price: "₹299",
        priceValue: 299,
        description: "Perfect for lifestyle bloggers and clean aesthetics.",
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop",
        features: ["Soft Whites", "Pastel Tones", "Skin Smoothing", "Indoor Lighting Fix"],
        category: "Lightroom Presets",
        rating: 4.9,
        reviews: 210
    },
    {
        id: "preset_3",
        title: "Cinematic Film Look",
        price: "₹349",
        priceValue: 349,
        description: "Replicate the look of Kodak Portra and classic film stocks.",
        imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
        features: ["Grain Overlay", "Vintage Colors", "Film Fade", "Nostalgic Vibe"],
        category: "Lightroom Presets",
        rating: 4.7,
        reviews: 180
    },
    {
        id: "preset_4",
        title: "Golden Hour Glow",
        price: "₹249",
        priceValue: 249,
        description: "Make every photo look like it was taken at sunset.",
        imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop",
        features: ["Warm Tones", "Sun Flare", "Soft Contrast", "Outdoor Portrait"],
        category: "Lightroom Presets",
        rating: 4.8,
        reviews: 95
    },

    // --- Stock Photos (35-37) ---
    {
        id: "stock_1",
        title: "Minimalist Office Pack",
        price: "₹499",
        priceValue: 499,
        description: "Clean, high-res photos of workspaces for your website.",
        imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
        features: ["50 High Res Photos", "Commercial Use", "Neutral Colors", "Tech Focus"],
        category: "Stock Photos",
        rating: 4.6,
        reviews: 40
    },
    {
        id: "stock_2",
        title: "Coffee & Books Aesthetic",
        price: "₹399",
        priceValue: 399,
        description: "Cozy vibes for bookstagram and lifestyle blogs.",
        imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop",
        features: ["Relaxed Atmosphere", "Latte Art", "Open Books", "Warm Lighting"],
        category: "Stock Photos",
        rating: 4.9,
        reviews: 75
    },
    {
        id: "stock_3",
        title: "Urban Street Photography",
        price: "₹449",
        priceValue: 449,
        description: "Gritty, authentic city shots for modern brands.",
        imageUrl: "https://images.unsplash.com/photo-1449824913929-2b3a6e547043?q=80&w=2070&auto=format&fit=crop",
        features: ["Cityscapes", "Night Lights", "Architecture", "Street Style"],
        category: "Stock Photos",
        rating: 4.7,
        reviews: 55
    },

    // --- Audio/SFX (38-40) ---
    {
        id: "audio_1",
        title: "Lo-Fi Beats for Creators",
        price: "₹299",
        priceValue: 299,
        description: "Chill, copyright-free background music for your videos.",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
        features: ["20 Tracks", "No Copyright Strikes", "Seamless Loops", "Relaxed Vibe"],
        category: "Audio Packs",
        rating: 4.8,
        reviews: 110
    },
    {
        id: "audio_2",
        title: "YouTuber SFX Pack",
        price: "₹199",
        priceValue: 199,
        description: "Essential sound effects: deep whooshes, pops, clicks, and risers.",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
        features: ["500+ Sounds", "WAV Format", "Transition FX", "UI Sounds"],
        category: "Audio Packs",
        rating: 4.9,
        reviews: 205
    },
    {
        id: "audio_3",
        title: "Cinematic Soundscapes",
        price: "₹349",
        priceValue: 349,
        description: "Atmospheric drones and textures for filmmakers.",
        imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
        features: ["Ambient Textures", "Tension Builders", "Sci-Fi Sounds", "Horror FX"],
        category: "Audio Packs",
        rating: 4.7,
        reviews: 45
    },

    // --- Infographics (41-42) ---
    {
        id: "infographic_1",
        title: "Business Growth Infographics",
        price: "₹349",
        priceValue: 349,
        description: "Visually stunning infographics that explain complex business concepts simply.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        features: ["Editable Vectors", "dark/Light Mode", "Data Visualization", "Print Ready"],
        category: "Infographics",
        rating: 4.8,
        reviews: 67
    },
    {
        id: "infographic_2",
        title: "Health & Wellness Visuals",
        price: "₹299",
        priceValue: 299,
        description: "Explain nutrition, fitness, and mental health concepts.",
        imageUrl: "https://images.unsplash.com/photo-1434493789847-2f02ea6ca920?q=80&w=2074&auto=format&fit=crop",
        features: ["Anatomy Charts", "Habit Trackers", "Nutrition Pyramids", "Yoga Poses"],
        category: "Infographics",
        rating: 4.9,
        reviews: 55
    },

    // --- Slide Shows (43-44) ---
    {
        id: "slide_1",
        title: "Pitch Deck Pro",
        price: "₹599",
        priceValue: 599,
        description: "Secure detailed funding with this investor-ready pitch deck template.",
        imageUrl: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1974&auto=format&fit=crop",
        features: ["30 Unique Slides", "PowerPoint & Keynote", "Investor Checklist", "Graph Templates"],
        category: "Slide Shows",
        rating: 4.9,
        reviews: 34
    },
    {
        id: "slide_2",
        title: "Minimalist Keynote Theme",
        price: "₹399",
        priceValue: 399,
        description: "Less is more. A clean, typographic presentation theme.",
        imageUrl: "https://images.unsplash.com/photo-1416339134316-0e91dc9ded92?q=80&w=1974&auto=format&fit=crop",
        features: ["50 Layouts", "Drag & Drop Images", "Free Fonts Used", "16:9 Aspect Ratio"],
        category: "Slide Shows",
        rating: 4.7,
        reviews: 28
    },

    // --- Notes (45-46) ---
    {
        id: "notes_1",
        title: "Medical Study Notes Bundle",
        price: "₹249",
        priceValue: 249,
        description: "High-yield handwritten notes for medical students.",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
        features: ["High Resolution Scan", "Searchable PDF", "Mnemonic Charts", "Exam Focused"],
        category: "Notes",
        rating: 4.9,
        reviews: 210
    },
    {
        id: "notes_2",
        title: "Coding Interview Cheat Sheets",
        price: "₹199",
        priceValue: 199,
        description: "Quick reference guides for Data Structures and Algorithms.",
        imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop",
        features: ["Python & Java", "Big O Notation", "Pattern Recognizers", "Dark Mode PDF"],
        category: "Notes",
        rating: 4.8,
        reviews: 305
    }
];

export function getProductById(id: string): Product | undefined {
    return PRODUCTS.find(p => p.id === id);
}

export function getRelatedProducts(currentId: string, limit: number = 3): Product[] {
    const currentProduct = getProductById(currentId);

    if (!currentProduct) return PRODUCTS.slice(0, limit);

    // Filter by same category, excluding current product
    let related = PRODUCTS.filter(p =>
        p.category === currentProduct.category && p.id !== currentId
    );

    // If not enough related products, fill with other random products
    if (related.length < limit) {
        const remaining = PRODUCTS.filter(p =>
            p.category !== currentProduct.category && p.id !== currentId
        );
        related = [...related, ...remaining];
    }

    return related.slice(0, limit);
}
