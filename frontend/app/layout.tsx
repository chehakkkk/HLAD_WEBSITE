import type { Metadata } from "next";
import {
  Playfair_Display,
  Lora,
  Rozha_One,
  Tiro_Devanagari_Hindi,
  Noto_Serif_Devanagari,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/shared/theme-provider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const rozha = Rozha_One({
  weight: "400",
  subsets: ["devanagari", "latin"],
  variable: "--font-rozha",
});

const tiro = Tiro_Devanagari_Hindi({
  weight: "400",
  subsets: ["devanagari", "latin"],
  variable: "--font-tiro",
});

const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-devanagari",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HLAD — Hindi Literature & Debating Club",
  description:
    "A scholarly community celebrating Hindi language, literature, and culture.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="hi"
      className={`
        ${playfair.variable}
        ${lora.variable}
        ${rozha.variable}
        ${tiro.variable}
        ${notoDevanagari.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
