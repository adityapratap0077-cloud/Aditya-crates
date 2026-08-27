"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/lib/products";

export default function AdminPage() {
    const { user, logout, isLoading } = useAuth();
    const { products, addProduct, deleteProduct, updateProduct } = useProducts();
    const router = useRouter();

    // Form State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Skins");
    const [imageUrl, setImageUrl] = useState("");
    const [downloadUrl, setDownloadUrl] = useState("");

    const handleEdit = (product: Product) => {
        setEditingId(product.id);
        setTitle(product.title);
        setPrice(product.priceValue.toString());
        setDescription(product.description);
        setCategory(product.category);
        setImageUrl(product.imageUrl);
        setDownloadUrl(product.downloadUrl || "");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Auth Check
    useEffect(() => {
        if (!isLoading && (!user || user.role !== "admin")) {
            router.push("/");
        }
    }, [user, isLoading, router]);

    if (isLoading || !user || user.role !== "admin") {
        return <div className="min-h-screen bg-background-dark flex items-center justify-center text-gray-500">Loading Access...</div>;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const priceVal = parseFloat(price);
        const formattedPrice = "₹" + priceVal;

        if (editingId) {
            // Update Existing
            updateProduct(editingId, {
                title,
                price: formattedPrice,
                priceValue: priceVal,
                description,
                imageUrl,
                category,
                downloadUrl
            });
            alert("Artifact Updated Successfully!");
            setEditingId(null);
        } else {
            // Create New
            const newProduct = {
                id: "prod_" + Date.now(),
                title,
                price: formattedPrice,
                priceValue: priceVal,
                description,
                imageUrl: imageUrl || "https://grainy-gradients.vercel.app/noise.svg", // Fallback
                category,
                features: ["New Arrival", "Exclusive"],
                rating: 5.0,
                reviews: 0,
                downloadUrl
            };
            addProduct(newProduct);
            alert("Artifact Minted Successfully!");
        }

        // Reset Form
        setTitle("");
        setPrice("");
        setDescription("");
        setImageUrl("");
        setDownloadUrl("");
    };

    return (
        <main className="min-h-screen bg-background-dark text-white selection:bg-primary/30">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/50 text-primary">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl font-serif">Admin Dashboard</h1>
                    </div>
                    <button
                        onClick={logout}
                        className="px-4 py-2 border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-bold uppercase tracking-widest"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Add Product Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8"
                    >
                        <h2 className="text-2xl font-serif mb-6 flex items-center gap-2">
                            {editingId ? (
                                <><span className="material-symbols-outlined text-primary">edit</span> Update Artifact</>
                            ) : (
                                <><Plus className="w-5 h-5 text-primary" /> Mint New Artifact</>
                            )}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="e.g. Neon Soul"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Price (ETH)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                                        placeholder="0.5"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Category</label>
                                    <input
                                        list="category-options"
                                        type="text"
                                        required
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                                        placeholder="Type or select category..."
                                    />
                                    <datalist id="category-options">
                                        <option value="Skins" />
                                        <option value="Artifacts" />
                                        <option value="Wearables" />
                                        <option value="Materials" />
                                        <option value="Reel Bundles" />
                                        <option value="Courses" />
                                        <option value="Templates" />
                                    </datalist>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Product Image</label>
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-1000"></div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="relative w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-px bg-white/10 flex-1"></div>
                                        <span className="text-xs text-gray-500 uppercase">OR URL</span>
                                        <div className="h-px bg-white/10 flex-1"></div>
                                    </div>
                                    <input
                                        type="url"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Product Asset URL (Download Link)</label>
                                <input
                                    type="url"
                                    value={downloadUrl}
                                    onChange={(e) => setDownloadUrl(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="e.g. Google Drive / Dropbox Link"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Description</label>
                                <textarea
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 h-32 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                                    placeholder="Describe the artifact..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors"
                            >
                                {editingId ? "Update Product" : "Mint Product"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setTitle("");
                                        setPrice("");
                                        setDescription("");
                                        setImageUrl("");
                                        setDownloadUrl("");
                                    }}
                                    className="w-full py-4 bg-white/5 text-gray-400 font-bold uppercase tracking-widest rounded-lg hover:bg-white/10 transition-colors mt-2"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </form>
                    </motion.div>

                    {/* Product List */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-serif mb-6">Active Inventory</h2>
                        <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                            {products.map((product) => (
                                <div key={product.id} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl items-center group">
                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-black/50 shrink-0">
                                        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-white truncate">{product.title}</h4>
                                        <p className="text-sm text-gray-400">{product.price}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="p-3 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                            title="Edit Artifact"
                                        >
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm('Burn this artifact?')) deleteProduct(product.id);
                                            }}
                                            className="p-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Delete Artifact"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
