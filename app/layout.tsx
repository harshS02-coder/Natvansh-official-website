import type { Metadata } from "next";
import { Inter, Anton, Bebas_Neue } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

import SplashScreen from "@/components/ui/SplashScreen";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Natvansh — Drama & Film Club | NIT Patna",
  description:
    "नटवंश — अस्ति कश्चित् विशेषः! The official Drama & Film Club of National Institute of Technology, Patna. Where stories come alive on stage and screen.",
  keywords: [
    "Natvansh",
    "NIT Patna",
    "Drama Club",
    "Film Club",
    "Theater",
    "Nukkad Natak",
    "नटवंश",
  ],
  openGraph: {
    title: "Natvansh — Drama & Film Club | NIT Patna",
    description: "Where stories come alive on stage and screen.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        data-theme="dark"
        className={`${inter.variable} ${anton.variable} ${bebasNeue.variable}`}
        suppressHydrationWarning
      >
        <body className="min-h-screen antialiased">
          <ThemeProvider>
            <CustomCursor />
            <SplashScreen />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
