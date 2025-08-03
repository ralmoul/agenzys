"use client";

import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { CTA } from "@/components/cta";

import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";
import FAQ from "@/components/ui/faq";

const testimonials = [
  {
    author: {
      name: "Emma Thompson",
      handle: "@emmaai",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "L'automatisation d'Agenzys a transformé notre processus de gestion des leads. La précision et la rapidité sont vraiment impressionnantes.",
    href: "https://twitter.com/emmaai"
  },
  {
    author: {
      name: "David Park",
      handle: "@davidtech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "L'intégration avec nos outils existants a été parfaite. Nous avons réduit notre temps de développement de 60% grâce à Agenzys.",
    href: "https://twitter.com/davidtech"
  },
  {
    author: {
      name: "Sofia Rodriguez",
      handle: "@sofiaml",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "Enfin un outil d'IA qui comprend vraiment le contexte ! La précision dans le traitement du langage naturel est impressionnante.",
    href: "https://twitter.com/sofiaml"
  }
]

export default function Home() {
  return (
    <main className="bg-white dark:bg-neutral-950">
      <Hero />
      <Features />
      <TestimonialsSection
        title="Nos clients témoignent"
        description="Découvrez comment Agenzys transforme la productivité des entreprises"
        testimonials={testimonials}
      />
      <FAQ />
      <CTA />
    </main>
  );
}
