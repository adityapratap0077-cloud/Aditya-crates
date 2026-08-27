"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Derive search results from query — no need for separate state
    const results = useMemo(() => {
        if (!query.trim()) return [];
        const lowerQuery = query.toLowerCase();
        return PRODUCTS.filter(product =>
            product.title.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        ).slice(0, 5);
    }, [query]);

    const handleClear = () => {
        if (query) {
            setQuery("");
            inputRef.current?.focus();
        } else {
            onClose();
        }
    };

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[90]"
                    />

                    {/* Search Bar Container */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-0 left-0 w-full z-[100] p-6"
                    >
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search assets, collections, or tags..."
                                    className="w-full bg-zinc-900/90 border border-white/10 rounded-2xl py-6 pl-16 pr-16 text-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary/50 shadow-2xl backdrop-blur-xl"
                                />
                                <button
                                    onClick={handleClear}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Popular Searches / Categories (Visible when query is empty) */}
                            {!query && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-8 space-y-8"
                                >
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Popular Categories</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {["Reel Bundles", "Courses", "Canva Templates", "Lightroom Presets", "Stock Photos", "Audio Packs"].map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setQuery(cat)}
                                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:text-white hover:border-white/30 transition-all"
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Trending Artifacts</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {PRODUCTS.slice(0, 2).map(product => (
                                                <Link
                                                    key={product.id}
                                                    href={`/product/${product.id}`}
                                                    onClick={onClose}
                                                    className="flex items-center gap-4 p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                                                >
                                                    <div className="w-12 h-12 bg-black/50 rounded-lg overflow-hidden shrink-0">
                                                        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h5 className="text-sm font-medium text-white truncate">{product.title}</h5>
                                                        <p className="text-xs text-gray-500">{product.price}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Results Dropdown */}
                            {results.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 bg-zinc-900/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl"
                                >
                                    {results.map(product => (
                                        <Link
                                            key={product.id}
                                            href={`/product/${product.id}`}
                                            onClick={onClose}
                                            className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0"
                                        >
                                            <div className="w-12 h-12 bg-black/50 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-medium group-hover:text-primary transition-colors">{product.title}</h4>
                                                <p className="text-xs text-gray-500">{product.category}</p>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                                        </Link>
                                    ))}
                                </motion.div>
                            )}

                            {/* No Results State */}
                            {query && results.length === 0 && (
                                <div className="mt-4 text-center py-8 text-gray-500">
                                    No results found for {`"${query}"`}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
