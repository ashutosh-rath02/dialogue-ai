// app/layout.tsx
import { DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "./lib/utils";
import { JSX, SVGProps } from "react";
import { Metadata } from "next";

const fontHeading = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Screenflick",
  description: "Generate iconic movie quotes from films around the world.",
  keywords: "movie quotes, dialogue generator, film quotes, global cinema",
  openGraph: {
    title: "Screenflick",
    description: "Generate iconic movie quotes from films around the world.",
    url: "https://screenflick.vercel.app/",
    siteName: "Screenflick",
    images: [
      {
        url: "https://screenflick.vercel.app",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Screenflick",
    description: "Generate iconic movie quotes from films around the world.",
    images: ["https://screenflick.vercel.app/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
          <div className="container mx-auto flex items-center justify-between max-w-5xl">
            <h1 className="text-xl font-bold">Screenflick</h1>
            <nav className="hidden md:flex items-center space-x-4">
              <a href="/" className="hover:underline">
                Home
              </a>
              <a href="/about" className="hover:underline flex items-center">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.86 2.33.66.07-.52.28-.86.51-1.06-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                    clipRule="evenodd"
                  />
                </svg>
                Github
              </a>
            </nav>
            <button className="md:hidden" aria-label="Toggle menu">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </header>
        <div className="flex flex-col min-h-screen max-w-5xl mx-auto">
          <main className="flex-1 py-12 px-6">{children}</main>
        </div>
        <footer className="bg-primary text-primary-foreground py-4 px-6 mt-auto">
          <div className="container mx-auto text-center text-sm">
            © 2024 Screenflick. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
