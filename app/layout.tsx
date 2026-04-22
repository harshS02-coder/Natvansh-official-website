import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import SplashScreen from "@/components/ui/SplashScreen";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://natvansh.nitp.ac.in"),
  title: {
    template: "%s | Natvansh",
    default: "Natvansh — Drama & Film Club | NIT Patna",
  },
  description: "नटवंश — अस्ति कश्चित् विशेषः! The official Drama & Film Club of National Institute of Technology, Patna. Where stories come alive on stage and screen.",
  keywords: ["Natvansh", "NIT Patna", "Drama Club", "Film Club", "Theater", "Nukkad Natak", "नटवंश"],
  authors: [{ name: "Natvansh Tech Team" }],
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Natvansh — Drama & Film Club",
    description: "The official stage and screen society of NIT Patna. We discover raw talent and perform stories that mirror society.",
    url: "https://natvansh.nitp.ac.in",
    siteName: "Natvansh NIT Patna",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Natvansh — Drama & Film Club | NIT Patna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Natvansh — Drama & Film Club",
    description: "The official stage and screen society of NIT Patna.",
    images: ["/opengraph-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="dark" suppressHydrationWarning>
        <head>
          {/* Google Fonts loaded via CSS link — no build-time network dependency */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Cinzel:wght@400;700;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </head>
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
