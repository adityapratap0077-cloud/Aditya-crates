"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Check, Download, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

import { useProducts } from "@/context/ProductContext";

export default function SuccessPage() {
    const { products } = useProducts();
    useEffect(() => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };

        const interval: ReturnType<typeof setInterval> = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // since particles fall down, start a bit higher than random
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#13c8ec', '#FFD700', '#ffffff']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#13c8ec', '#FFD700', '#ffffff']
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gold/5 blur-[120px]" />
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-panel max-w-md w-full p-8 md:p-12 text-center border border-primary/20 relative z-10"
            >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/50 shadow-neon">
                    <Check className="w-10 h-10 text-primary" />
                </div>

                <h1 className="font-serif text-4xl text-white mb-2">Payment Successful</h1>
                <p className="text-gray-400 mb-8">
                    Welcome to the avant-garde. Your digital assets are ready for secure download.
                </p>

                <div className="space-y-4">
                    {(() => {
                        let buttonText = "Go to My Library";
                        let buttonAction = () => { window.location.href = "/dashboard"; };

                        try {
                            const lastPurchased = localStorage.getItem("last_purchased");
                            if (lastPurchased) {
                                const ids = JSON.parse(lastPurchased);
                                if (ids.length === 1) {
                                    const product = products.find(p => p.id === ids[0]);
                                    if (product) {
                                        buttonText = `Download ${product.title}`;
                                        buttonAction = () => {
                                            if (product.downloadUrl) {
                                                window.location.href = product.downloadUrl;
                                            } else {
                                                window.location.href = `/product/${ids[0]}`;
                                            }
                                        };
                                    }
                                }
                            }
                        } catch (e) {
                            console.error("Failed to parse last_purchased", e);
                        }

                        return (
                            <button
                                onClick={buttonAction}
                                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-white hover:to-white text-background-dark hover:text-black font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-neon hover:shadow-neon-hover cursor-pointer"
                            >
                                <Download className="w-5 h-5" />
                                {buttonText}
                            </button>
                        );
                    })()}

                    <Link href="/" className="block w-full py-4 px-6 text-sm text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Return to Store
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}
