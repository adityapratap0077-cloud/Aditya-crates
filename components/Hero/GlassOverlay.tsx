"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AppWindow, Palette, Zap } from "lucide-react";
import GlassCard from "./GlassCard";

export default function GlassOverlay() {
    // --- Scroll & Animation Hooks ---
    const { scrollYProgress } = useScroll();

    // Parallax & Opacity transforms
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

    const containerRef = useRef(null); // Added this back as it was in the original code

    return (
        <div ref={containerRef} className="relative w-full h-[300vh] pointer-events-none">
            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center">

                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pointer-events-auto"
                >

                    {/* --- LEFT: Typography & Liquid Button --- */}
                    <div className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start z-20 text-center lg:text-left relative">
                        {/* Contrast Background for Text */}
                        <div className="absolute inset-0 bg-radial-gradient from-black/60 to-transparent blur-3xl -z-10 scale-150 opacity-80" />

                        {/* Brand Name Stacked */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] lg:leading-[0.9] text-white tracking-[-0.02em] mb-6 lg:mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
                        >
                            <span className="block">EMPOWER</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-gradient-x drop-shadow-none filter brightness-125">YOUR</span>
                            <span className="block">CREATIVITY</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-lg md:text-xl text-gray-100 max-w-lg mb-8 drop-shadow-md font-medium"
                        >
                            Premium Reel Bundles, Canva Templates, and Courses designed for modern creators. Scale your brand with high-quality digital assets.
                        </motion.p>

                        {/* Liquid Silver Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="relative group w-auto"
                            onClick={() => {
                                document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            {/* Liquid Texture Container */}
                            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#e0e0e0] via-[#9e9e9e] to-[#e0e0e0] px-8 py-3 lg:px-10 lg:py-4 shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-white/40">
                                {/* Liquid Sheen Animation */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                                <div className="absolute inset-0 opacity-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                                <span className="relative z-10 text-black font-sans font-bold text-xs lg:text-sm tracking-[0.15em] uppercase flex items-center gap-2">
                                    Explore Collection
                                </span>
                            </div>
                        </motion.button>
                    </div>

                    {/* --- RIGHT: Vertical Stack of Deep Glass Cards --- */}
                    <div className="lg:col-span-5 flex flex-col gap-4 lg:gap-6 justify-center h-full max-h-[60vh] lg:max-h-[80vh] py-10 lg:py-20 hidden md:flex">

                        {/* Card 1: Reel Bundles (Deep Amber/Gold - High Contrast) */}
                        <GlassCard className="flex-1 flex flex-col items-center justify-center gap-4 bg-zinc-900/60 border-amber-500/30 hover:bg-zinc-800/80 hover:border-amber-400/60 backdrop-blur-xl !p-0 !rounded-2xl overflow-hidden group/card relative transition-all duration-300 shadow-2xl">
                            {/* Inner Gradient Tint */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-black/20 pointer-events-none" />

                            <Zap className="w-12 h-12 text-amber-400 stroke-[1.5] drop-shadow-[0_0_20px_rgba(251,191,36,0.6)] z-10" />
                            <span className="text-white font-serif text-2xl tracking-wide z-10 drop-shadow-md">Reel Bundles</span>
                        </GlassCard>

                        {/* Card 2: Canva Templates (Deep Cyan/Blue - High Contrast) */}
                        <GlassCard className="flex-1 flex flex-col items-center justify-center gap-4 bg-zinc-900/60 border-cyan-500/30 hover:bg-zinc-800/80 hover:border-cyan-400/60 backdrop-blur-xl !p-0 !rounded-2xl overflow-hidden group/card relative transition-all duration-300 shadow-2xl">
                            {/* Inner Gradient Tint */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-black/20 pointer-events-none" />

                            <Palette className="w-12 h-12 text-cyan-400 stroke-[1.5] drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] z-10" />
                            <span className="text-white font-serif text-2xl tracking-wide z-10 drop-shadow-md">Templates</span>
                        </GlassCard>

                        {/* Card 3: Courses (Deep Emerald/Green - High Contrast) */}
                        <GlassCard className="flex-1 flex flex-col items-center justify-center gap-4 bg-zinc-900/60 border-emerald-500/30 hover:bg-zinc-800/80 hover:border-emerald-400/60 backdrop-blur-xl !p-0 !rounded-2xl overflow-hidden group/card relative transition-all duration-300 shadow-2xl">
                            {/* Inner Gradient Tint */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-black/20 pointer-events-none" />

                            <AppWindow className="w-12 h-12 text-emerald-400 stroke-[1.5] drop-shadow-[0_0_20px_rgba(52,211,153,0.6)] z-10" />
                            <span className="text-white font-serif text-2xl tracking-wide z-10 drop-shadow-md">Courses</span>
                        </GlassCard>

                    </div>

                </motion.div>
            </div>
        </div>
    );
}
