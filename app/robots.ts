import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/dashboard", "/success"],
            },
        ],
        sitemap: "https://adityacreates.com/sitemap.xml",
    };
}
