"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
    const { items, isOpen, toggleCart, removeItem, total, updateQuantity, clearCart } = useCart();
    const { user, addPurchases, openModal } = useAuth();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = async () => {
        if (!user) {
            openModal();
            return;
        }

        setIsProcessing(true);

        // Mock Payment Processing Delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const productIds = items.map(item => item.id);
        addPurchases(productIds);
        clearCart();

        setIsProcessing(false);
        router.push("/success");
        toggleCart();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900/90 border-l border-white/10 shadow-2xl z-[70] flex flex-col backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="text-xl font-serif text-white">Your Cart</h2>
                            <button onClick={toggleCart} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                    <p>Your cart is empty.</p>
                                    <button onClick={toggleCart} className="mt-4 text-primary hover:underline">
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-20 h-20 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-white font-medium">{item.title}</h3>
                                                <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-400">{item.price}</p>

                                            <div className="flex items-center gap-3 mt-2">
                                                <div className="flex items-center gap-2 bg-white/5 rounded-full px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                        className="text-gray-400 hover:text-white p-1"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-xs text-white font-mono min-w-[1ch] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="text-gray-400 hover:text-white p-1"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-black/20">
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-gray-400">Total</span>
                                    <span className="text-2xl font-mono text-white">Ξ {total.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isProcessing}
                                    className="w-full py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        user ? "Checkout" : "Sign In to Checkout"
                                    )}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
