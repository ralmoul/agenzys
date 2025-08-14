import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ChatbaseInit from "@/components/chatbase-init";


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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if(!window.chatbase||window.chatbase("getState")!=="initialized"){
                  window.chatbase=(...arguments)=>{
                    if(!window.chatbase.q){
                      window.chatbase.q=[]
                    }
                    window.chatbase.q.push(arguments)
                  };
                  window.chatbase=new Proxy(window.chatbase,{
                    get(target,prop){
                      if(prop==="q"){
                        return target.q
                      }
                      return(...args)=>target(prop,...args)
                    }
                  })
                }
                const onLoad=function(){
                  const script=document.createElement("script");
                  script.src="https://www.chatbase.co/embed.min.js";
                  script.id="Px45w8Wrw12r_qvx-bPNr";
                  script.domain="www.chatbase.co";
                  document.body.appendChild(script)
                };
                if(document.readyState==="complete"){
                  onLoad()
                }else{
                  window.addEventListener("load",onLoad)
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={cn("antialiased bg-black", inter.className)}
      >
        <Navbar />
        {children}
        <Footer />
        <ChatbaseInit />

      </body>
    </html>
  );
}
