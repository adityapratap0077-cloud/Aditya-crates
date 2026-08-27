"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface HeroScrollSequenceProps {
    children?: ReactNode;
}

export default function HeroScrollSequence({ children }: HeroScrollSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);

    const frameCount = 121; // ezgif-frame-001.jpg to ezgif-frame-121.jpg

    // Helper to generate dynamic paths based on EXISTING filenames
    const getFramePath = (index: number) => {
        // Current files are ezgif-frame-001.jpg, so we need 1-based index padding
        const frameNumber = (index + 1).toString().padStart(3, "0");
        return `/frames/ezgif-frame-${frameNumber}.jpg`;
    };

    // 1. Preload Images
    useEffect(() => {
        let isCancelled = false;

        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 0; i < frameCount; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = getFramePath(i);
                    img.onload = () => {
                        if (!isCancelled) {
                            loadedImages[i] = img;
                            setLoadedCount((prev) => prev + 1);
                        }
                        resolve();
                    };
                    img.onerror = () => {
                        console.warn(`Frame ${i + 1} failed to load: ${img.src}`);
                        // Still resolve to not block
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            if (!isCancelled) {
                setImages(loadedImages);
            }
        };

        loadImages();

        return () => {
            isCancelled = true;
        };
    }, []);

    // 2. Scroll & Render Loop
    useEffect(() => {
        if (images.length === 0) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        // Current frame index (float for lerping)
        let currentFrameIndex = 0;

        const render = () => {
            if (!container) return;

            // Calculate scroll progress 0 to 1
            // The container is 400vh tall. We want to map the scroll position relative to this container.
            // Since it's at the top of the page usually, window.scrollY works well if it starts at 0.
            // Ensure we clamp between 0 and 1 based on the container's height minus viewport.

            const rect = container.getBoundingClientRect();
            // rect.top is 0 when at top of viewport. It goes negative as we scroll down.
            // The total scrollable distance is container height - viewport height.
            // We want progress = -rect.top / (rect.height - window.innerHeight)

            const scrollableDistance = rect.height - window.innerHeight;
            let rawProgress = -rect.top / scrollableDistance;

            // Clamp progress
            rawProgress = Math.max(0, Math.min(1, rawProgress));

            // Target frame
            const targetFrameIndex = rawProgress * (frameCount - 1);

            // Lerp for smoothness (0.1 factor)
            // frame = frame + (target - frame) * 0.1
            const diff = targetFrameIndex - currentFrameIndex;

            // If minimal movement, snap to target to save CPU or just keep running 
            if (Math.abs(diff) > 0.01) {
                currentFrameIndex += diff * 0.1;
            } else {
                currentFrameIndex = targetFrameIndex;
            }

            // Draw
            const frameIndexInt = Math.round(currentFrameIndex);
            const img = images[frameIndexInt];

            if (img && img.width > 0) {
                // High DPI handling
                const dpr = window.devicePixelRatio || 1;
                // Check if canvas size matches display size
                const width = window.innerWidth;
                const height = window.innerHeight;

                if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
                    canvas.width = width * dpr;
                    canvas.height = height * dpr;
                    ctx.scale(dpr, dpr); // Normalize coordinate system
                }

                // CSS size (ensure it styles correctly even if logical size changes)
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;

                // Object-fit: cover logic
                // We draw into the logical size (window.innerWidth/Height) since we scaled the context
                const renderW = width;
                const renderH = height;

                const hRatio = renderW / img.width;
                const vRatio = renderH / img.height;
                const ratio = Math.max(hRatio, vRatio);

                const centerShift_x = (renderW - img.width * ratio) / 2;
                const centerShift_y = (renderH - img.height * ratio) / 2;

                ctx.clearRect(0, 0, renderW, renderH);
                ctx.drawImage(
                    img,
                    0,
                    0,
                    img.width,
                    img.height,
                    centerShift_x,
                    centerShift_y,
                    img.width * ratio,
                    img.height * ratio
                );
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [images]);

    // Loading Progress
    const loadProgress = Math.round((loadedCount / frameCount) * 100);
    const isLoading = loadProgress < 5; // Show loader until 5% loaded for faster perceived load

    return (
        <div ref={containerRef} className="relative h-[400vh] supports-[height:100dvh]:h-[400dvh]">

            {/* Sticky Canvas Container */}
            <div className="sticky top-0 h-screen supports-[height:100dvh]:h-[100dvh] overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-[-1]"
                />
                {/* Optional Overlay to darken/tint if needed */}
                {/* <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none" /> */}

                {/* Loading Spinner */}
                {isLoading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black text-white">
                        <div className="flex flex-col items-center gap-4">
                            <div
                                className="w-10 h-10 border-4 border-white/20 border-t-[#13c8ec] rounded-full animate-spin"
                            />
                            <p className="font-mono text-sm uppercase tracking-widest">
                                Loading {loadProgress}%
                            </p>
                        </div>
                    </div>
                )}

                {/* The Slot for GlassOverlay and other content */}
                <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
                    {/* We enable pointer events on children if needed via CSS in the child */}
                    {children}
                </div>
            </div>

        </div>
    );
}
