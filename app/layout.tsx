import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Or use a local font if preferred
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "ClipLux | Precision Grooming",
    description: "Experience the next generation of nail care.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased bg-white text-black/90`}>{children}</body>
        </html>
    );
}
