import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";

import "@/styles/globals.scss";

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
});

const spaceMono = Space_Mono({
    weight: ["400", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--font-space-mono",
    display: "swap",
});
export const metadata: Metadata = {
    title: {
        default: "Ibrahima BARRY – Portfolio",
        template: "%s | Ibrahima BARRY",
    },
    description:
        "Portfolio d'Ibrahima BARRY. Direction artistique, UI/UX, développement front-end et projets web avec Next.js.",
    authors: [{ name: "Ibrahima BARRY", url: "https://tonsite.com" }],
    metadataBase: new URL("https://tonsite.com"),
    openGraph: {
        title: "Ibrahima BARRY – Portfolio",
        description:
            "Découvrez mes projets en design, développement front-end et UI/UX.",
        url: "https://tonsite.com",
        siteName: "Ibrahima BARRY – Portfolio",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Aperçu du portfolio de Ibrahima BARRY",
            },
        ],
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ibrahima BARRY – Portfolio",
        description:
            "Portfolio en ligne. Design, UI/UX et développement front-end.",
        images: ["/og-image.png"],
        creator: "@tonhandle",
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },

    keywords: [
        "portfolio",
        "web developer",
        "UI/UX",
        "Next.js",
        "design",
        "front-end",
    ],
};

// app/layout.tsx
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning>
            <body className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
                {children}
            </body>
        </html>
    );
}
