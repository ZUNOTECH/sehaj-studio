import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "Sehaj Studio | Contemporary Indian Ethnic Wear",
  description: "Premium contemporary Indian ethnic womenswear. Discover our collection of co-ord sets, suit sets, and sharara suits with quiet luxury and timeless elegance.",
  keywords: ["Indian ethnic wear", "contemporary fashion", "co-ord sets", "suit sets", "sharara suits", "premium ethnic wear", "Indian designer wear"],
  openGraph: {
    title: "Sehaj Studio | Contemporary Indian Ethnic Wear",
    description: "Premium contemporary Indian ethnic womenswear. Discover our collection of co-ord sets, suit sets, and sharara suits.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ paddingTop: '88px' }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
