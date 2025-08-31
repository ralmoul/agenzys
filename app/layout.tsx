import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agenzys - Automatisation Invisible pour Agences Immobilières",
  description:
    "Automatisez vos tâches répétitives sans changer vos habitudes. Génération de leads, relances clients et gestion documentaire pour agences immobilières. Intégration transparente à vos outils existants.",
  keywords: "automatisation agence immobilière, leads immobilier, CRM immobilier, Hektor, Adapt Immo, Leizee, relance client automatique",
  authors: [{ name: "Thomas Bouziza" }],
  creator: "Agenzys",
  publisher: "Agenzys",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://agenzys.vercel.app",
    title: "Agenzys - Automatisation Invisible pour Agences Immobilières",
    description: "Automatisez vos tâches répétitives sans changer vos habitudes. Génération de leads, relances clients et gestion documentaire.",
    siteName: "Agenzys",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agenzys - Automatisation Invisible pour Agences Immobilières",
    description: "Automatisez vos tâches répétitives sans changer vos habitudes. Génération de leads, relances clients et gestion documentaire.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head></head>
      <body
        className={cn("antialiased bg-black", inter.className)}
      >
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />

      </body>
    </html>
  );
}
