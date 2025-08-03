import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agenzys - Solutions Digitales Innovantes",
  description:
    "Agenzys propose des solutions digitales innovantes pour votre entreprise. Services de développement web, applications mobiles et consulting digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn("antialiased bg-black", inter.className)}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
