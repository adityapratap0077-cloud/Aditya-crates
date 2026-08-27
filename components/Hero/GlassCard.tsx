"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className={`glass-panel p-8 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-neon-hover group transition-all duration-300 ${className}`}
        >
            {children}
        </motion.div>
    );
}
