'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FAQProps {
  className?: string
}

export default function FAQ({ className }: FAQProps) {
    const faqItems = [
        {
            id: 'item-1',
            question: "Qu'est-ce que le système d'Agenzys exactement ?",
            answer: "Agenzys propose des systèmes sur-mesure pour agences immobilières, intégrée directement à vos outils existants (comme Hektor, Adapt Immo ou Leizee). Elle optimise les tâches répétitives comme la génération de leads, les relances clients et la gestion documentaire, sans changer vos habitudes ni ajouter de nouvelle interface.",
        },
        {
            id: 'item-2',
            question: 'Dois-je installer un nouveau logiciel ou une application ?',
            answer: "Non, rien du tout. Nos systèmes s'intègrent de manière invisible à vos outils actuels, sans téléchargement supplémentaire. Vous continuez à travailler comme avant, mais avec plus d'efficacité.",
        },
        {
            id: 'item-3',
            question: 'Avec quels outils Agenzys est-il compatible ?',
            answer: "Avec plus de 15 outils leaders du marché immobilier, comme les CRM Hektor, Adapt Immo, Leizee, et bien d'autres. Si votre outil n'est pas listé, nous vérifions la compatibilité lors du diagnostic.",
        },
        {
            id: 'item-4',
            question: 'Est-ce que cela va changer les habitudes de mon équipe ?',
            answer: "Absolument pas. Les systèmes opèrent en coulisses, sans modifier vos flux quotidiens. Vos agents gardent leurs repères, et seules les tâches chronophages disparaissent, libérant du temps pour les ventes.",
        },
        {
            id: 'item-5',
            question: 'Combien de temps faut-il pour mettre en place tout ça ?',
            answer: "Généralement 30 à 45 jours, selon la complexité de vos process. Cela commence par un diagnostic gratuit, suivi d'une intégration sur-mesure et d'une validation rapide par votre équipe.",
        },
        {
            id: 'item-6',
            question: "Les systèmes mis en place par Agenzys remplace-t-elle les agents immobiliers ?",
            answer: "Non, elle les complète. Elle gère les tâches répétitives pour que vos agents se concentrent sur les relations clients et les négociations, augmentant ainsi les ventes sans réduire les emplois.",
        },
        {
            id: 'item-7',
            question: 'Est-ce sécurisé pour mes données clients ?',
            answer: "Oui, nous utilisons des standards avancés de cryptage et respectons les réglementations sur la protection des données (RGPD). Vos informations restent confidentielles et sécurisées dans vos propres outils.",
        },
    ]

    return (
        <section className={cn("py-16 md:py-24 bg-neutral-950", className)} id="faq">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl text-white">Questions Fréquentes</h2>
                    <p className="text-neutral-400 mt-4 text-balance">Découvrez les réponses aux questions les plus courantes sur nos solutions d'automatisation pour agences immobilières.</p>
                </div>

                <div className="mx-auto mt-12 max-w-3xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-neutral-900/50 ring-neutral-800 w-full rounded-2xl border border-neutral-800 px-8 py-3 shadow-sm ring-4">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dashed border-neutral-700">
                                <AccordionTrigger className="cursor-pointer text-base hover:no-underline text-white">{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base text-neutral-300">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-neutral-400 mt-6 px-8 text-center">
                        Une autre question ? Contactez notre{' '}
                        <Link
                            href="#contact"
                            className="text-orange-500 font-medium hover:underline">
                            équipe de support
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}