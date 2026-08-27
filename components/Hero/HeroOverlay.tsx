"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

export default function HeroOverlay() {
    return (
        <div className="relative z-10 w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-screen px-6 pt-20">
            {/* Left: Typography & CTA */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-7 flex flex-col gap-8 relative z-20"
            >
                <div className="flex flex-col">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-primary text-sm font-bold tracking-[0.2em] mb-4 uppercase pl-1"
                    >
                        Future of Luxury
                    </motion.span>
                    <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] text-white tracking-tight">
                        ADITYA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 italic pr-4">
                            CREATES
                        </span>
                    </h1>
                </div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-gray-400 max-w-md text-lg font-light leading-relaxed pl-6 border-l border-primary/30"
                >
                    Digital luxury for the modern avant-garde. Experience the convergence of high fashion and cyberpunk aesthetics.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex flex-wrap gap-6 mt-4 pl-1"
                >
                    <button className="relative group overflow-hidden rounded-full bg-primary/10 border border-primary/50 text-white px-8 py-4 min-w-[180px] hover:bg-primary/20 transition-all">
                        <span className="relative z-10 font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2">
                            Explore
                            <ArrowUpRight className="w-4 h-4" />
                        </span>
                    </button>
                    <button className="px-8 py-4 border border-white/20 rounded-full hover:border-primary/50 hover:text-primary transition-colors text-sm font-bold tracking-widest uppercase text-gray-300 flex items-center gap-2">
                        <Play className="w-3 h-3 fill-current" />
                        View Showreel
                    </button>
                </motion.div>
            </motion.div>

            {/* Right: Glass Card Stack */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: "circOut" }}
                className="lg:col-span-5 relative h-[500px] lg:h-[600px] flex items-center justify-center perspective-1000"
            >
                {/* Card 3 (Back) */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="glass-panel absolute w-[280px] h-[400px] rotate-6 translate-x-12 -translate-y-4 opacity-40 z-0 border border-white/5 bg-black/20 flex flex-col p-4"
                >
                    <div className="flex-1 bg-cover bg-center rounded mb-4" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9CsI8UkTutzpGZn9SHSLZ2jNz49XlNvMv9gmvmTZ43KKHoJGZhbWG60NP6U-z1lEpVWyAdg8RseJnfRzjUoHv7AdkTmXBqAVlYSp_JVqjCQS6X7_24lArr5kHjFYevGLladikhaw_Qd0cE9ze97GYB6NCl1E8sCDMUf5DMn9YathVba-QAvBk17p01BGlJaGM-n82rj2FyfvUTa87wINLsqMDlCxq5j2s3TSBugVAk3w5qQbSXgZwibbdwa4cMlT6QHshVVPjqUM')" }} />
                </motion.div>

                {/* Card 2 (Middle) */}
                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                    className="glass-panel absolute w-[280px] h-[400px] -rotate-3 translate-x-6 translate-y-4 opacity-70 z-10 border border-white/10 bg-black/30 flex flex-col p-4"
                >
                    <div className="flex-1 bg-cover bg-center rounded mb-4" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpqtJKtkSgBy59RNe-hMNWrbeTJwM6F3MkNq2u41r5lJ_n3xT43GxSPHPuDne2iu8jryeMpxbUlZPuAsceVxqjOL3L3wbWAMnwD_pkOCAixkiHrKFw3ybKeHaV68MPWy8VSYq-JuLwKYE_1qWmbhIXNRBfm15hhlw0yAT2eafqdRyD4n4AxUfcOVAuecSTOSlJrGN3Sk7xME-huBB5-38mS9KYALMvRitQEqA-y4twm1x-HJtmrTh5bKl5esdlpwwSf9MOjgFUZus')" }} />
                </motion.div>

                {/* Card 1 (Front) */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.5 }}
                    className="glass-panel absolute w-[280px] h-[400px] rotate-2 -translate-x-4 z-20 flex flex-col p-4 shadow-2xl shadow-black/50 border border-white/10 bg-black/40 backdrop-blur-xl"
                >
                    <div className="flex-1 rounded mb-4 relative group overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCoLd9lV7LBe9_uQasV7WyJMPAdY-XC9FBfS2pEOTEch3m8IWY0VaYw2u33-YLoaOnoWzcAdl3z48WJWdifpxsG07sIWFxQVMvZq7oTexkAebMuiQziMDMTTJmZV3oQn58oa_haEwp-RKo20FL8hEzhRd7uM4DD69XvybEHD7pKx2qz5yiBx1eTR7RTeGCjgtiXA5hPzDrabbTzW8cKCDn51Lh6KFGG_B710Cl_hQbyBkFIlOMhgzJAth6SZ6P-HQxI_axKh8-jTXU')" }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <span className="text-primary font-serif italic text-xl">The Void Series</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <h3 className="font-serif text-xl text-white">Genesis.01</h3>
                            <p className="text-xs text-gray-400">Digital Artifact</p>
                        </div>
                        <div className="text-right">
                            <p className="text-primary font-mono text-sm">Ξ 2.45</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
