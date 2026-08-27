"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/products";

// Extend or map props to Product type if needed.
// We treated `Product` interface in lib/products as the source of truth.
// The grid passes {...product}, so props match Product interface.

type ProductCardProps = Product;

export default function ProductCard(product: ProductCardProps) {
    const { addItem } = useCart();
    const { id, title, price, imageUrl, isRare } = product;

    const handleBuy = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if clicking buy
        e.stopPropagation();
        addItem(product);
    };

    return (
        <motion.div
            whileHover={{ y: -15 }}
            className="group relative h-full flex flex-col"
        >
            <Link href={`/product/${id}`} className="absolute inset-0 z-0" />

            {/* Glass Background */}
            <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm group-hover:border-primary/50 group-hover:bg-white/10 transition-all duration-500 shadow-lg group-hover:shadow-[0_0_30px_rgba(43,230,255,0.2)]"></div>

            {/* 3D Render Placeholder (Top) */}
            <div className="relative aspect-[4/5] m-3 rounded-lg overflow-hidden bg-black/40 border border-white/5 group-hover:border-white/20 transition-colors pointer-events-none">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${imageUrl}')` }}
                />

                {/* Floating Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>

                {isRare && (
                    <div className="absolute top-3 right-3 bg-amber-500/20 backdrop-blur-md rounded px-2 py-1 border border-amber-500/50 z-20">
                        <span className="text-xs font-mono text-amber-300 uppercase tracking-widest">Rare</span>
                    </div>
                )}

                {/* Description Overlay on Hover */}
                <div className="absolute inset-0 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <p className="text-sm text-gray-200 text-center font-medium leading-relaxed drop-shadow-md">
                        {product.description}
                    </p>
                </div>
            </div>

            {/* Bottom Details */}
            <div className="relative p-5 mt-auto z-10 pointer-events-none">
                <h3 className="font-serif text-2xl text-white mb-2 leading-tight group-hover:text-primary transition-colors">{title}</h3>

                <div className="flex justify-between items-end border-t border-white/10 pt-4 pointer-events-auto">
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">Edition</p>
                        <p className="text-xl text-white font-light font-mono">{price}</p>
                    </div>

                    <button
                        onClick={handleBuy}
                        className="bg-primary/10 hover:bg-primary hover:text-black border border-primary/50 text-primary text-xs font-bold uppercase py-2 px-6 rounded shadow-[0_0_10px_rgba(43,230,255,0.2)] hover:shadow-[0_0_20px_rgba(43,230,255,0.6)] transition-all duration-300 cursor-pointer"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
