import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Library",
    description: "Manage and download your purchased digital assets.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
