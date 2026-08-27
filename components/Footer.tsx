"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
    return (
        <footer id="footer" className="relative z-10 pt-32 pb-20 px-6">
            <div className="w-full max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* Col 1: Logo & Copyright (Span 4) */}
                    <div className="md:col-span-4 flex flex-col justify-between h-full">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Sparkles className="text-white w-6 h-6" />
                                <span className="font-serif font-bold text-xl tracking-wider text-white uppercase">ADITYA CREATES</span>
                            </div>
                            <p className="text-sm text-gray-500 max-w-xs font-light leading-relaxed">
                                Premium digital assets for the avant-garde. <br />
                                Designed with precision and passion.
                            </p>
                        </div>
                        <p className="text-xs text-gray-600 mt-12 md:mt-0 font-mono">
                            © 2026 Aditya Creates.
                        </p>
                    </div>

                    {/* Col 2: Links (Span 4) - Centered list */}
                    <div className="md:col-span-4 flex flex-col md:items-center">
                        <div className="flex flex-col gap-4">
                            <h5 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 text-left">Explore</h5>
                            <Link href="/#products-section" className="text-sm text-gray-400 hover:text-white transition-colors">Collection</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Licensing</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                        </div>
                    </div>

                    {/* Col 3: Socials (Span 4) - Right Aligned */}
                    <div className="md:col-span-4 flex flex-col md:items-end">
                        <h5 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6 text-left md:text-right w-full">Connect</h5>
                        <div className="flex gap-6">
                            {/* Twitter (Wireframe) */}
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6 stroke-current stroke-1 fill-none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                            </a>
                            {/* Instagram (Wireframe) */}
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6 stroke-current stroke-1 fill-none" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            {/* Youtube (Wireframe) */}
                            <a href="mailto:contact@adityacreates.com" className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6 stroke-current stroke-1 fill-none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
