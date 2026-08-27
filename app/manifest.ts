import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Aditya Creates — Premium Digital Assets",
        short_name: "Aditya Creates",
        description:
            "Shop premium digital assets: reel bundles, Canva templates, courses, eBooks, Lightroom presets, AI prompts, and more.",
        start_url: "/",
        display: "standalone",
        background_color: "#0a0a0a",
        theme_color: "#13c8ec",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}
