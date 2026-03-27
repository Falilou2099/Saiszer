import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saiszer — 3D Artist & Motion Designer",
  description:
    "Portfolio de Saiszer, artiste 3D et motion designer. Créations visuelles cinématiques, animations 3D et direction artistique.",
  keywords: [
    "3D artist",
    "motion designer",
    "portfolio",
    "animation 3D",
    "VFX",
    "direction artistique",
  ],
  openGraph: {
    title: "Saiszer — 3D Artist & Motion Designer",
    description:
      "Créations visuelles cinématiques, animations 3D et direction artistique.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saiszer — 3D Artist & Motion Designer",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${spaceMono.variable}`}>
      <body className="bg-bg text-white antialiased selection:bg-accent/30 selection:text-white">
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
