"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Product } from "@/lib/products";

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
    toggleCart: () => void;
    updateQuantity: (productId: string, quantity: number) => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const hasHydrated = useRef(false);

    // Load from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem("aditya_cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        hasHydrated.current = true;
    }, []);

    // Save to localStorage (only after hydration)
    useEffect(() => {
        if (!hasHydrated.current) return;
        localStorage.setItem("aditya_cart", JSON.stringify(items));
    }, [items]);

    const addItem = (product: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsOpen(true); // Open cart when adding item
    };

    const removeItem = (productId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setItems([]);
    };

    const toggleCart = () => {
        setIsOpen((prev) => !prev);
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const total = items.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, isOpen, addItem, removeItem, clearCart, toggleCart, updateQuantity, total }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
