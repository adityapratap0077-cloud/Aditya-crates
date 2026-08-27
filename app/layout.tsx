import type { Metadata } from "next";
import { Inter, GFS_Didot } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import CartSidebar from "@/components/Cart/CartSidebar";
import AuthModal from "@/components/Auth/AuthModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const gfsDidot = GFS_Didot({
  variable: "--font-gfs-didot",
  weight: "400",
  subsets: ["greek"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adityacreates.com"),
  title: {
    default: "Aditya Creates | Premium Digital Assets for Creators",
    template: "%s | Aditya Creates",
  },
  description:
    "Shop premium digital assets: viral reel bundles, Canva templates, online courses, eBooks, Lightroom presets, AI prompts, stock photos, and audio packs. Built for creators, by a creator.",
  keywords: [
    "digital assets",
    "reel bundles",
    "Canva templates",
    "Lightroom presets",
    "online courses",
    "eBooks",
    "AI prompts",
    "content creator tools",
    "social media templates",
    "digital products",
    "Aditya Creates",
  ],
  authors: [{ name: "Aditya Creates" }],
  creator: "Aditya Creates",
  publisher: "Aditya Creates",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://adityacreates.com",
    siteName: "Aditya Creates",
    title: "Aditya Creates | Premium Digital Assets for Creators",
    description:
      "Shop premium reel bundles, Canva templates, courses, eBooks, presets, and more. Built for creators, by a creator.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aditya Creates — Premium Digital Assets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Creates | Premium Digital Assets for Creators",
    description:
      "Shop premium reel bundles, Canva templates, courses, eBooks, presets, and more.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${gfsDidot.variable} antialiased bg-background-light dark:bg-background-dark text-white font-sans`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              {children}
              <CartSidebar />
              <AuthModal />
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
