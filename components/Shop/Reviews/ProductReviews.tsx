"use client";

import { useState } from "react";
import { User, Star, Send, CheckCircle, TrendingUp } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

interface Review {
    id: string;
    author: string;
    avatar?: string;
    role?: string;
    rating: number;
    comment: string;
    date: string;
    verified?: boolean;
    result?: string;
}

const MOCK_REVIEWS: Review[] = [
    {
        id: "r1",
        author: "Marcus Chen",
        role: "Digital Artist",
        rating: 5,
        comment: "I was stuck at 200 views for months. I almost quit. Then I used the Viral Reels Pack. My first video hit 50k views overnight. It's not just a template, it's a career saver.",
        date: "2 days ago",
        verified: true,
        result: "50k Views Overnight"
    },
    {
        id: "r2",
        author: "Elena R.",
        role: "Lifestyle Creator",
        rating: 5,
        comment: "The Faceless Marketing Bundle is deeper than I expected. It gave me the confidence to post without showing my face, and I've already signed my first brand deal.",
        date: "1 week ago",
        verified: true,
        result: "$500 Brand Deal"
    },
    {
        id: "r3",
        author: "Davide",
        role: "Music Producer",
        rating: 5,
        comment: "The audio packs are crisp. Used 'Lo-Fi Beats' in my background and retention went up by 40%. Simple tweak, huge difference.",
        date: "2 weeks ago",
        verified: true,
        result: "+40% Retention"
    },
    {
        id: "r4",
        author: "Sarah J.",
        role: "Coach",
        rating: 4,
        comment: "Great quality assets. The course helped me structure my own digital product launch. Highly recommend for beginners.",
        date: "3 weeks ago",
        verified: true
    }
];

export default function ProductReviews() {
    const { user, openModal } = useAuth();
    const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(5);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            openModal();
            return;
        }
        if (!newComment.trim()) return;

        const review: Review = {
            id: Date.now().toString(),
            author: user.name || "Anonymous",
            role: "Verified User",
            avatar: user.avatarUrl,
            rating: newRating,
            comment: newComment,
            date: "Just now",
            verified: true
        };

        setReviews([review, ...reviews]);
        setNewComment("");
        setNewRating(5);
    };

    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-serif text-white">Reviews ({reviews.length})</h3>

            {/* Write Review */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                {!user ? (
                    <div className="text-center py-4">
                        <p className="text-gray-400 mb-4">Sign in to leave a review.</p>
                        <button onClick={openModal} className="text-primary hover:underline font-bold">Sign In</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setNewRating(star)}
                                    className={`transition-colors ${star <= newRating ? "text-amber-400" : "text-gray-600"}`}
                                >
                                    <Star className="w-6 h-6 fill-current" />
                                </button>
                            ))}
                        </div>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your review..."
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-primary focus:outline-none min-h-[100px]"
                            required
                        />
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-primary text-black px-6 py-2 rounded-lg font-bold hover:bg-white transition-colors"
                        >
                            Post Review <Send className="w-4 h-4" />
                        </button>
                    </form>
                )}
            </div>

            {/* List Reviews */}
            <div className="space-y-6">
                {reviews.map((review) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={review.id}
                        className="bg-white/5 border border-white/5 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group hover:border-white/10 transition-colors"
                    >
                        {/* Verified Background Effect */}
                        {review.verified && (
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <CheckCircle className="w-16 h-16" />
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 overflow-hidden flex items-center justify-center">
                                    {review.avatar ? (
                                        <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-white font-bold">{review.author}</h4>
                                        {review.verified && (
                                            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" /> Verified
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">{review.role || "Creator"}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex text-amber-400 text-xs gap-0.5 mb-1">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-current" />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-600 font-mono">{review.date}</span>
                            </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed font-light mb-4 relative z-10">{`"${review.comment}"`}</p>

                        {/* Result Tag */}
                        {review.result && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg">
                                <TrendingUp className="w-3 h-3 text-primary" />
                                <span className="text-xs text-primary font-bold uppercase tracking-wide">{review.result}</span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
