import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PriceMarquee from "@/components/home/PriceMarquee";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  display: "swap",
});

export const metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={notoSansBengali.variable}>
        <Navbar />
        <PriceMarquee/>
        {children}
        <Footer />
      </body>
    </html>
  );
}