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
  title: {
    default: "saiszer — Cinematic 3D Artist & Motion Designer",
    template: "%s | saiszer",
  },
  description:
    "Cinematic 3D visuals, motion-led direction, and premium image-making for music, artists, and culture-forward projects.",
  keywords: [
    "cinematic 3D artist",
    "3D artist",
    "motion designer",
    "portfolio",
    "music visuals",
    "animation 3D",
    "VFX",
    "direction artistique",
  ],
  applicationName: "saiszer",
  category: "portfolio",
  openGraph: {
    title: "saiszer — Cinematic 3D Artist & Motion Designer",
    description:
      "Cinematic 3D visuals, motion-led direction, and premium visual storytelling for artists, music, and image-led worlds.",
    type: "website",
    locale: "fr_FR",
    siteName: "saiszer",
  },
  twitter: {
    card: "summary_large_image",
    title: "saiszer — Cinematic 3D Artist & Motion Designer",
    description:
      "Cinematic 3D visuals and motion-led direction for music, artists, and culture-forward collaborations.",
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
