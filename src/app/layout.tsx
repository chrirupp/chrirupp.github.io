import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Christian Rupprecht",
  description: "Associate Professor of Computer Science at the University of Oxford. Research in computer vision and machine learning, with focus on unsupervised learning, 3D reconstruction, and visual understanding.",
  openGraph: {
    title: "Christian Rupprecht",
    description: "Associate Professor of Computer Science at the University of Oxford. Research in computer vision and machine learning.",
    url: "https://chrirupp.github.io",
    siteName: "Christian Rupprecht",
    images: [
      {
        url: "https://chrirupp.github.io/images/profile.jpg",
        width: 800,
        height: 800,
        alt: "Christian Rupprecht",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Christian Rupprecht",
    description: "Associate Professor of Computer Science at the University of Oxford.",
    images: ["https://chrirupp.github.io/images/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
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
