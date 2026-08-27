"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { PRODUCTS as INITIAL_PRODUCTS, Product } from "@/lib/products";

interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const hasHydrated = useRef(false);

    useEffect(() => {
        const savedProducts = localStorage.getItem("aditya_products");
        if (savedProducts) {
            try {
                setProducts(JSON.parse(savedProducts));
            } catch (e) {
                console.error("Failed to parse products", e);
                setProducts(INITIAL_PRODUCTS);
            }
        } else {
            setProducts(INITIAL_PRODUCTS);
        }
        hasHydrated.current = true;
    }, []);

    const addProduct = (product: Product) => {
        const updatedProducts = [product, ...products];
        setProducts(updatedProducts);
        localStorage.setItem("aditya_products", JSON.stringify(updatedProducts));
    };

    const deleteProduct = (id: string) => {
        const updatedProducts = products.filter(p => p.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem("aditya_products", JSON.stringify(updatedProducts));
    };

    const updateProduct = (id: string, updates: Partial<Product>) => {
        const updatedProducts = products.map(p =>
            p.id === id ? { ...p, ...updates } : p
        );
        setProducts(updatedProducts);
        localStorage.setItem("aditya_products", JSON.stringify(updatedProducts));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
}
