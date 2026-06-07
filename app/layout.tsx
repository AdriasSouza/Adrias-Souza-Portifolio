import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adrias Soares de Souza — Full-Stack & Data",
  description:
    "Desenvolvedor Full-Stack & Analista de Dados. Construindo desde interfaces com UX impecável até microsserviços e motores de auditoria fiscal.",
  icons: {
    icon: "/images/adrias-portrait.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. data-gptw) inject attrs after SSR */}
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
