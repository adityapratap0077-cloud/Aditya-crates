"use client";


import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Download, PackageOpen, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
    const { user } = useAuth();
    const { products } = useProducts();

    if (!user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-400 mb-4">Please sign in to view your library.</p>
                    <Link href="/" className="text-primary hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    // Safely access library, defaulting to empty array if undefined (backward compatibility)
    const library = user.library || [];
    const myProducts = library.map(id => products.find(p => p.id === id)).filter(Boolean);

    return (
        <main className="min-h-screen bg-background-dark selection:bg-primary/30">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Store
                </Link>

                <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl font-serif text-white mb-2">My Library</h1>
                        <p className="text-gray-400">Manage and download your digital assets.</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500 uppercase tracking-widest">Account</p>
                        <p className="text-white font-mono mb-2">{user.email}</p>
                        <button
                            onClick={() => {
                                const confirmClear = window.confirm("Are you sure you want to clear your library? This action cannot be undone.");
                                if (confirmClear) {
                                    const updatedUser = { ...user, library: [] };
                                    localStorage.setItem("aditya_user", JSON.stringify(updatedUser));
                                    localStorage.removeItem("aditya_products"); // Clear product cache to load new static products
                                    window.location.reload();
                                }
                            }}
                            className="text-xs text-red-500 hover:text-red-400 underline"
                        >
                            Debug: Clear Library
                        </button>
                    </div>
                </div>

                {myProducts.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <PackageOpen className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl text-white font-bold mb-2">Your library is empty</h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Start building your collection of premium digital assets.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors"
                        >
                            Browse Collection <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {myProducts.map((product) => product && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={product.id}
                                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-colors"
                            >
                                <div className="aspect-video bg-black/40 relative">
                                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-serif text-white mb-1">{product.title}</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">{product.category}</p>

                                    <button
                                        onClick={() => {
                                            if (product.downloadUrl) {
                                                window.open(product.downloadUrl, '_blank');
                                            }
                                        }}
                                        disabled={!product.downloadUrl}
                                        className={`w-full flex items-center justify-center gap-2 border rounded-lg py-2 text-sm font-bold transition-colors ${product.downloadUrl
                                            ? "border-white/20 text-white hover:bg-white hover:text-black cursor-pointer"
                                            : "border-white/5 text-gray-500 cursor-not-allowed hover:bg-transparent"
                                            }`}
                                    >
                                        {product.downloadUrl ? (
                                            <>
                                                <Download className="w-4 h-4" /> Access Asset
                                            </>
                                        ) : (
                                            "Coming Soon"
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
