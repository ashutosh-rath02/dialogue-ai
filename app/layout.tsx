import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global Movie Dialogue Generator",
  description:
    "Generate famous dialogues from movies around the world using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-6">
              <h1 className="text-2xl font-semibold text-center text-gray-800">
                Global Movie Dialogue Generator
              </h1>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
              © 2024 Global Movie Dialogue Generator. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
