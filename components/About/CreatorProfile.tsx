"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram, Twitter, Mail } from "lucide-react";

export default function CreatorProfile() {
    return (
        <section className="relative z-10 py-32 px-6 overflow-hidden">
            <div className="max-w-[1200px] mx-auto relative">

                {/* Background Decor */}
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 relative group"
                    >
                        <div className="aspect-[4/5] relative rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                            <img
                                src="/images/creator.jpeg"
                                alt="Aditya - Creator"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Overlay Texture */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                            {/* Floating Name Tag */}
                            <div className="absolute bottom-8 left-8 border-l-2 border-primary pl-4 backdrop-blur-sm pr-4 py-2 bg-black/20 rounded-r-lg">
                                <h3 className="text-3xl font-serif text-white leading-none mb-1">Aditya</h3>
                                <p className="text-primary text-sm font-mono uppercase tracking-widest">Digital Architect</p>
                            </div>
                        </div>

                        {/* Decorative Borders */}
                        <div className="absolute -inset-4 border border-white/5 rounded-3xl -z-10 group-hover:border-primary/20 transition-colors duration-500" />
                        <div className="absolute -inset-4 border border-white/5 rounded-3xl -z-10 rotate-2 opacity-50" />
                    </motion.div>

                    {/* Text Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-1/2"
                    >
                        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-primary uppercase tracking-widest mb-6">
                            The Visionary
                        </div>

                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                            Building the <span className="text-gray-500 italic">Architecture</span> of <br />
                            Digital Influence.
                        </h2>

                        <div className="space-y-6 text-gray-400 font-light leading-relaxed mb-10">
                            <p>
                                {`"I didn't just want to make templates. I wanted to build a `}<strong className="text-white font-medium">standard</strong>{`."`}
                            </p>
                            <p>
                                Behind every viral moment is a structure. A specific combination of sound, timing, and visual weight. I&apos;ve spent years decoding these patterns so you don&apos;t have to.
                            </p>
                            <p>
                                This isn&apos;t just a store. It&apos;s my personal arsenal. Every asset here is a tool I use to cut through the noise. Welcome to the new baseline of quality.
                            </p>
                        </div>

                        {/* Signature / Socials */}
                        <div className="flex items-center gap-8 border-t border-white/10 pt-8">
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all">
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all">
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a href="mailto:hello@adityacreates.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all">
                                    <Mail className="w-4 h-4" />
                                </a>
                            </div>

                            <a href="#products-section" className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                                View Collection <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
