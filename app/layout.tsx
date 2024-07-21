import { DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "./lib/utils";
import { JSX, SVGProps } from "react";

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
        <div className="flex flex-col min-h-screen">
          <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
            <div className="container mx-auto flex items-center justify-between">
              <h1 className="text-xl font-bold">
                Global Movie Dialogue Generator
              </h1>
              <nav className="hidden md:flex items-center space-x-4">
                <a href="#" className="hover:underline">
                  Home
                </a>
                <a href="#" className="hover:underline">
                  About
                </a>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </nav>
              <button className="md:hidden">
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </header>
          <main className="flex-1 py-12 px-6">{children}</main>
          <footer className="bg-primary text-primary-foreground py-4 px-6 mt-auto">
            <div className="container mx-auto text-center text-sm">
              © 2024 Global Movie Dialogue Generator. All rights reserved.
            </div>
          </footer>
        </div>
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
