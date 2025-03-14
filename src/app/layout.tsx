import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdminAuthProvider from "@/features/authentication/components/AdminAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best Deals and Discounts - Daily Offers | Deals Burst",
  description: "Discover the best deals and discounts on electronics, fashion, home goods, and more. Save money with exclusive offers, coupon codes, and limited-time sales on top products. Shop smart and save big!",
  keywords: "deals, promotions, discounts, coupons, sales, offers, bargains, shopping deals, online deals, daily deals, best deals, special offers, discount codes, promo codes, savings, hot deals, limited time offers, exclusive deals, cheap prices, top deals, budget shopping, clearance sales",
  icons: "/images/db_logo.svg",
  viewport: "width=device-width, initial-scale=1.0"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/algolia-min.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div className='md:container md:mx-auto'>
          <AdminAuthProvider>
            {children}
          </AdminAuthProvider>
        </div>
        <Footer />
      </body>
    </html>
  )
}
