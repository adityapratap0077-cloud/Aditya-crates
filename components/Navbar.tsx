"use client";

import Link from "next/link";
import { Search, Sparkles, ShoppingCart, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useRef } from "react";
import SearchOverlay from "@/components/SearchOverlay";

export default function Navbar() {
    const { toggleCart, items } = useCart();
    const { user, logout, openModal } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    // Close profile menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };
        if (isProfileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isProfileMenuOpen]);

    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-center pointer-events-none">
            <div className="glass-panel w-full max-w-[1200px] flex items-center justify-between px-6 py-3 pointer-events-auto relative">
                <div className="flex items-center gap-2">
                    <Sparkles className="text-primary w-6 h-6" />
                    <span className="font-serif font-bold text-xl tracking-wider text-white uppercase">ADITYA CREATES</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/#products-section" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Collection</Link>
                    <Link href="/#trusted-section" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Artists</Link>
                    <Link href="/#footer" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</Link>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="p-2 text-gray-300 hover:text-white transition-colors"
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    {/* Cart Button */}
                    <button
                        onClick={toggleCart}
                        className="p-2 text-gray-300 hover:text-white transition-colors relative"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-black text-[10px] font-bold flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Desktop Auth Button */}
                    {user ? (
                        <div ref={profileRef} className="hidden md:flex items-center gap-4 relative">
                            <button
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                            >
                                <span className="text-sm font-medium text-white">{user.name.split(' ')[0]}</span>
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-primary font-bold">
                                    {user.avatarUrl ? (
                                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        user.name.charAt(0).toUpperCase()
                                    )}
                                </div>
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileMenuOpen && (
                                <div className="absolute top-full right-0 mt-4 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1">
                                    {user.role === 'admin' && (
                                        <Link
                                            href="/admin"
                                            className="block px-4 py-3 text-sm text-yellow-500 hover:bg-white/5 border-b border-white/5"
                                            onClick={() => setIsProfileMenuOpen(false)}
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <Link
                                        href="/dashboard"
                                        className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                                        onClick={() => setIsProfileMenuOpen(false)}
                                    >
                                        My Library
                                    </Link>
                                    <button
                                        onClick={() => { logout(); setIsProfileMenuOpen(false); }}
                                        className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 hover:text-red-300"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={openModal}
                            className="hidden md:block px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-sm font-medium text-white transition-all backdrop-blur-md"
                        >
                            Connect
                        </button>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-gray-300 hover:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <LogOut className="w-6 h-6 rotate-180" /> : <div className="space-y-1.5 to-white/80">
                            <div className="w-6 h-0.5 bg-current"></div>
                            <div className="w-6 h-0.5 bg-current"></div>
                            <div className="w-6 h-0.5 bg-current"></div>
                        </div>}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full mt-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-6 md:hidden shadow-2xl">
                        <Link href="/#products-section" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white">Collection</Link>
                        <Link href="/#trusted-section" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white">Artists</Link>
                        <Link href="/#footer" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white">About</Link>

                        <div className="h-px bg-white/10 w-full" />

                        {user ? (
                            <div className="flex flex-col gap-4">
                                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-lg font-medium text-white">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-primary font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    My Library
                                </Link>
                                <button
                                    onClick={() => { logout(); setIsMenuOpen(false); }}
                                    className="text-left text-red-500 font-medium text-lg pl-11"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => { openModal(); setIsMenuOpen(false); }}
                                className="w-full py-3 bg-white/10 border border-white/10 rounded-xl text-white font-bold"
                            >
                                Connect Wallet
                            </button>
                        )}
                    </div>
                )}
            </div>

            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </nav>
    );
}
