import type { Metadata } from "next";
import { Geist, Geist_Mono as GeistMono } from "next/font/google";

import "./globals.css";
import BreadCrump from "@/components/BreadCrump";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = GeistMono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IT Legend",
  description: "The Legend of IT Training",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="min-h-screen">
          <BreadCrump />

          <div className="container mx-auto flex gap-6 px-6 sm:px-8 w-full">
            {/* Main content section */}
            <section className="flex-1 py-8">
              <div className="mx-auto w-full max-w-7xl">{children}</div>
            </section>

            {/* Right sidebar */}
            <aside className="max-lg:hidden w-100 py-8">
              <div className="sticky top-24 rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Quick Links
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Right sidebar content</p>
                  <p>Additional information</p>
                  <p>Course Materials</p>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </body>
    </html>
  );
}
