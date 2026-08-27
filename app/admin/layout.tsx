import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Manage products and inventory.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
