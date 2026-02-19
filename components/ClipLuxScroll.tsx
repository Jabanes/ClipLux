"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import { frames } from "./frameImages";


// const FRAME_COUNT = 120; 
// const ACTUAL_FRAME_COUNT = 40;

export default function ClipLuxScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll (0-1) to frame index (0 - frames.length - 1)
    const currentIndex = useTransform(scrollYProgress, [0, 1], [1, frames.length]);



    // Preload images - now much simpler as they are imported
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];

            for (let i = 0; i < frames.length; i++) {
                const img = new Image();
                // When imported via Next.js/Webpack, the import is an object with a src string or the string itself
                const src = typeof frames[i] === 'string' ? frames[i] : (frames[i] as any).src;
                img.src = src;

                await new Promise((resolve) => {
                    if (img.complete) {
                        resolve(true);
                    } else {
                        img.onload = () => resolve(true);
                        img.onerror = () => {
                            console.error(`Failed to load frame ${i + 1}`);
                            resolve(false);
                        };
                    }
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    // Draw to canvas
    const render = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Ensure index is integer and within bounds
        let frameIndex = Math.floor(index) - 1;
        if (frameIndex < 0) frameIndex = 0;
        if (frameIndex >= images.length) frameIndex = images.length - 1;

        const img = images[frameIndex];

        // Helper to clear canvas
        const clear = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        if (!img || !img.complete || img.naturalWidth === 0) {
            // Image not loaded or broken
            clear();
            // Optional: Draw placeholder text
            // ctx.fillStyle = "#ccc";
            // ctx.fillText("Frame missing", 10, 50);
            return;
        }

        // Clear and draw
        // Calculate aspect ratio to "contain"
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawHeight = canvasHeight;
            drawWidth = drawHeight * imgRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = canvasWidth;
            drawHeight = drawWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        }

        clear();
        try {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        } catch (e) {
            console.error("Error drawing image:", e);
        }
    };

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const dpr = window.devicePixelRatio || 1;
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                canvas.style.width = `${window.innerWidth}px`;
                canvas.style.height = `${window.innerHeight}px`;

                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.scale(dpr, dpr);
                }

                // Re-render current frame
                const current = currentIndex.get();
                render(current);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Init size
        return () => window.removeEventListener("resize", handleResize);
    }, [images]); // Re-bind if images change

    // Update on scroll
    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (!isLoading && images.length > 0) {
            render(latest);
        }
    });

    return (
        <div ref={containerRef} className="h-[400vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
                        <div className="text-white/50 text-sm animate-pulse">Loading ClipLux Experience...</div>
                    </div>
                )}
                <canvas ref={canvasRef} className="block w-full h-full" />

                {/* Story Overlays - Using absolute positioning within the sticky container */}
                <StoryOverlay scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}


function StoryOverlay({ scrollYProgress }: { scrollYProgress: any }) {
    // Helper to fade in/out based on range
    const OpacitySection = ({ start, end, children, align = "center" }: any) => {
        const opacity = useTransform(scrollYProgress,
            [start - 0.05, start, end, end + 0.05],
            [0, 1, 1, 0]
        );
        const y = useTransform(scrollYProgress,
            [start - 0.05, end + 0.05],
            [50, -50]
        );

        const alignmentClasses = {
            left: "items-start text-left pl-10 md:pl-20",
            right: "items-end text-right pr-10 md:pr-20",
            center: "items-center text-center"
        };

        return (
            <motion.div
                style={{ opacity, y }}
                className={`absolute inset-0 flex flex-col justify-center pointer-events-none ${alignmentClasses[align as keyof typeof alignmentClasses]}`}
            >
                {children}
            </motion.div>
        );
    };

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* 0% - 20% */}
            <OpacitySection start={0.0} end={0.15} align="center">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white/90">Precision Grooming.</h2>
                <p className="mt-2 text-lg text-white/60 font-light">Clean cuts. Zero mess.</p>
            </OpacitySection>

            {/* 30% */}
            <OpacitySection start={0.25} end={0.4} align="left">
                <h3 className="text-3xl md:text-5xl font-semibold text-white/80">Designed for control.</h3>
                <p className="mt-2 text-white/50 max-w-md font-light">Ergonomic grip that fits perfectly in your hand.</p>
            </OpacitySection>

            {/* 60% */}
            <OpacitySection start={0.55} end={0.7} align="right">
                <h3 className="text-3xl md:text-5xl font-semibold text-white/80">Quiet motor.<br />Clean trim.</h3>
                <p className="mt-2 text-white/50 max-w-md font-light">Whisper-quiet technology meets medical-grade steel.</p>
            </OpacitySection>

            {/* 90% */}
            <OpacitySection start={0.85} end={0.95} align="center">
                <h2 className="text-4xl md:text-6xl font-bold text-white/90">Premium results.</h2>
                <div className="mt-6 pointer-events-auto">
                    <button className="px-8 py-3 bg-white text-black rounded-full text-lg shadow-lg hover:scale-105 transition-all font-semibold">
                        Shop ClipLux
                    </button>
                </div>
            </OpacitySection>
        </div>
    );
}
