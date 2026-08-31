import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TopAppBar } from "@/components/TopAppBar";
import { Footer } from "@/components/Footer";
import { ConsentBanner } from "@/components/ConsentBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gridinsiders.com"),
  title: {
    default: "GridInsiders | Forensic F1 Technical Analysis",
    template: "%s | GridInsiders",
  },
  description:
    "GridInsiders is a forensic Formula 1 analysis platform covering aerodynamics, telemetry, and car development for hardcore technical enthusiasts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="flex min-h-screen flex-col bg-background pt-16 font-body text-on-background antialiased">
        <TopAppBar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
