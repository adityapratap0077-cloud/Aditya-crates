"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, Share2, Heart, Star } from "lucide-react";
import Link from "next/link";
import ProductReviews from "@/components/Shop/Reviews/ProductReviews";
import ProductCard from "@/components/Shop/ProductCard";

interface ProductPageClientProps {
    productId: string;
}

export default function ProductPageClient({ productId }: ProductPageClientProps) {
    const { products } = useProducts();
    const product = products.find(p => p.id === productId);

    // Also get related products from full list
    const relatedProducts = products
        .filter(p => p.category === product?.category && p.id !== productId)
        .slice(0, 3);

    // Fallback if not enough related
    if (relatedProducts.length < 3 && product) {
        const remaining = products.filter(p => p.category !== product.category && p.id !== productId).slice(0, 3 - relatedProducts.length);
        relatedProducts.push(...remaining);
    }

    const { addItem } = useCart();

    if (!product) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                {/* Show loading state if products are still hydrating, or 404 if truly missing */}
                {products.length === 0 ? (
                    <div className="text-white animate-pulse">Loading Artifact...</div>
                ) : (
                    <div className="text-center">
                        <h1 className="text-4xl font-serif text-white mb-4">404</h1>
                        <p className="text-gray-400 mb-8">Artifact not found.</p>
                        <Link href="/" className="text-primary hover:underline">Return to Collection</Link>
                    </div>
                )}
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background-dark selection:bg-primary/30">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-32">

                    {/* Left: Image / Visuals */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40 relative group"
                        >
                            <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                            {product.isRare && (
                                <div className="absolute top-4 right-4 bg-amber-500/20 backdrop-blur-md rounded px-3 py-1 border border-amber-500/50">
                                    <span className="text-sm font-mono text-amber-300 uppercase tracking-widest">Rare Edition</span>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right: Details */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="sticky top-32"
                        >
                            <h1 className="text-5xl md:text-6xl font-serif text-white mb-4 leading-tight">{product.title}</h1>

                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-3xl font-mono text-primary">{product.price}</span>
                                <div className="h-6 w-px bg-white/20" />
                                <div className="flex gap-1 text-amber-400 text-sm">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                    <span className="text-gray-500 ml-1">({product.reviews} reviews)</span>
                                </div>
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light border-l-2 border-primary/30 pl-6">
                                {product.description}
                            </p>

                            <div className="mb-10">
                                <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Features</h4>
                                <ul className="space-y-3">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-400">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex gap-4 mb-12">
                                <button
                                    onClick={() => addItem(product)}
                                    className="flex-1 bg-white text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(43,230,255,0.4)]"
                                >
                                    <ShoppingBag className="w-5 h-5" /> Add to Cart
                                </button>
                                <button className="p-4 border border-white/20 rounded-lg hover:border-white text-white transition-colors">
                                    <Heart className="w-5 h-5" />
                                </button>
                                <button className="p-4 border border-white/20 rounded-lg hover:border-white text-white transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Reviews Section */}
                            <div className="pt-10 border-t border-white/10">
                                <ProductReviews />
                                {/* Licensing Terms (Digital Asset) */}
                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <h3 className="text-white font-serif mb-3">Licensing</h3>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <ul className="space-y-2 text-sm text-gray-400">
                                            <li className="flex items-center gap-2">
                                                <span className="text-green-400 w-4">✓</span> Commercial & Personal Use Included
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-green-400 w-4">✓</span> Unlimited Projects
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-red-400 w-4">✕</span> Reselling or Redistribution Prohibited
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="border-t border-white/10 pt-20">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="font-serif text-3xl md:text-4xl text-white">
                            You Might Also <span className="font-light italic text-gray-400">Like</span>
                        </h2>
                        <Link href="/#products-section" className="hidden sm:flex items-center gap-2 text-sm text-primary hover:text-white transition-colors">
                            View Collection <span className="material-symbols-outlined text-sm">→</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} {...p} />
                        ))}
                    </div>
                </div>

            </div>

            <Footer />
        </main>
    );
}
