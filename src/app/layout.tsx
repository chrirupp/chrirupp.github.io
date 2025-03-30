import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Christian Rupprecht's Academic Website",
  description: "Academic profile and research website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="text-xl font-bold text-gray-800">
                    Christian Rupprecht
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/"
                    className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
                  >
                    Home
                  </Link>
                  <Link
                    href="/news"
                    className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
                  >
                    News
                  </Link>
                  <Link
                    href="/teaching"
                    className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
                  >
                    Teaching
                  </Link>
                  <Link
                    href="/team"
                    className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
                  >
                    Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
        <footer className="bg-gray-50 border-t">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} Christian Rupprecht. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
