"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string; // Optional
    library: string[]; // Array of Product IDs owned
    role: "admin" | "user";
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    signup: (name: string, email: string) => Promise<void>;
    logout: () => void;
    addPurchases: (productIds: string[]) => void;
    isLoading: boolean;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Initial check (mock persistence)
    useEffect(() => {
        const savedUser = localStorage.getItem("aditya_user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to parse saved user", e);
                localStorage.removeItem("aditya_user");
            }
        }
    }, []);

    const login = async (email: string) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const isAdmin = email === "admin@aditya.com" || email === "adityapratap0077@gmail.com";

        const mockUser: User = {
            id: "user_" + Math.random().toString(36).substr(2, 9),
            name: email.split("@")[0], // Mock name from email
            email,
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            library: [],
            role: isAdmin ? "admin" : "user"
        };

        setUser(mockUser);
        localStorage.setItem("aditya_user", JSON.stringify(mockUser));
        setIsLoading(false);
    };

    const loginWithGoogle = async () => {
        setIsLoading(true);
        // Simulate Google Popup delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const googleUser: User = {
            id: "google_" + Date.now().toString(36),
            name: "Aditya User", // Default Google Name
            email: "user@gmail.com",
            avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocIq8d1-8d1-8d1-8d1-8d1=s96-c", // Generic Google Avatar
            library: [],
            role: "user"
        };

        setUser(googleUser);
        localStorage.setItem("aditya_user", JSON.stringify(googleUser));
        setIsLoading(false);
        closeModal();
    };

    const signup = async (name: string, email: string) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Slightly longer delay

        const isAdmin = email === "admin@aditya.com" || email === "adityapratap0077@gmail.com";

        const mockUser: User = {
            id: "user_" + Math.random().toString(36).substr(2, 9),
            name,
            email,
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            library: [],
            role: isAdmin ? "admin" : "user"
        };

        setUser(mockUser);
        localStorage.setItem("aditya_user", JSON.stringify(mockUser));
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("aditya_user");
    };

    const addPurchases = (productIds: string[]) => {
        if (!user) return;

        // Avoid duplicates
        const newLibrary = Array.from(new Set([...user.library, ...productIds]));
        const updatedUser = { ...user, library: newLibrary };

        setUser(updatedUser);
        localStorage.setItem("aditya_user", JSON.stringify(updatedUser));

        // Store last purchased for redirect
        localStorage.setItem("last_purchased", JSON.stringify(productIds));
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <AuthContext.Provider value={{ user, login, loginWithGoogle, signup, logout, addPurchases, isLoading, isModalOpen, openModal, closeModal }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}
