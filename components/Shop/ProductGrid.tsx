"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "@/context/ProductContext";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function ProductGrid() {
    const { products } = useProducts();
    const [showAll, setShowAll] = useState(false);

    const visibleProducts = showAll ? products : products.slice(0, 8);

    return (
        <section className="relative z-10 py-24 px-6 bg-background-dark/80 backdrop-blur-lg">
            <div className="w-full max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="font-serif text-4xl md:text-5xl text-white w-full mb-2">
                            Premium <span className="font-light italic text-primary">Creator Tools</span>
                        </h2>
                        <p className="text-gray-400 max-w-md">
                            Everything you need to grow your brand. From viral reels to educational courses.
                        </p>
                    </div>

                    {!showAll && (
                        <button
                            onClick={() => setShowAll(true)}
                            className="hidden sm:flex items-center gap-2 text-sm text-primary hover:text-white transition-colors"
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    {visibleProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>

                {!showAll && (
                    <div className="flex justify-center">
                        <button
                            onClick={() => setShowAll(true)}
                            className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold uppercase tracking-widest hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 flex items-center gap-2 group"
                        >
                            View Full Collection
                            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
