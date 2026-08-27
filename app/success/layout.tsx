import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Payment Successful",
    description: "Your purchase is complete. Download your digital assets.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function SuccessLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
