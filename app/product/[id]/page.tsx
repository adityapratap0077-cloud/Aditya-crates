import { Metadata } from "next";
import { PRODUCTS, getProductById } from "@/lib/products";
import ProductPageClient from "./ProductPageClient";

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return PRODUCTS.map((product) => ({
        id: product.id,
    }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        return {
            title: "Product Not Found",
            description: "The requested product could not be found.",
        };
    }

    return {
        title: product.title,
        description: product.description,
        keywords: [product.category, product.title, "digital asset", "creator tools", "Aditya Creates"],
        openGraph: {
            title: `${product.title} — Aditya Creates`,
            description: product.description,
            url: `https://adityacreates.com/product/${product.id}`,
            siteName: "Aditya Creates",
            images: [
                {
                    url: product.imageUrl,
                    width: 1200,
                    height: 630,
                    alt: product.title,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.title} — Aditya Creates`,
            description: product.description,
            images: [product.imageUrl],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = getProductById(id);

    // JSON-LD Structured Data
    const jsonLd = product
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: product.imageUrl,
            brand: {
                "@type": "Brand",
                name: "Aditya Creates",
            },
            offers: {
                "@type": "Offer",
                price: product.priceValue,
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
                url: `https://adityacreates.com/product/${product.id}`,
            },
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.reviews,
                bestRating: 5,
            },
            category: product.category,
        }
        : null;

    return (
        <>
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            <ProductPageClient productId={id} />
        </>
    );
}
