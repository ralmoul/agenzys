'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState('mentions')

  const legalSections = [
    { id: 'mentions', label: 'Mentions Légales' },
    { id: 'privacy', label: 'Politique de Confidentialité' },
    { id: 'cgu', label: 'Conditions Générales d\'Utilisation' },
    { id: 'cgv', label: 'Conditions Générales de Vente' },
  ]

  const renderContent = () => {
    switch(activeSection) {
      case 'mentions':
        return (
          <div className="space-y-8">
            <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
              <h1 className="text-3xl font-bold text-neutral-800 dark:text-white">Mentions Légales</h1>
            </div>
            
            <div className="grid gap-6 md:gap-8">
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Éditeur du site
                </h2>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Le site Agenzys (<a href="https://agenzys.vercel.app" className="text-orange-500 hover:underline">https://agenzys.vercel.app</a>) est édité par :
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                  <p className="font-medium text-neutral-800 dark:text-white mb-2">Thomas David Joseph Bouziza</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Entrepreneur individuel</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">9 Voie de l'Ordonnée, Résidence Les Falaises</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">27100 Val-de-Reuil, France</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">SIREN :</span> 883 178 394</p>
                    <p><span className="font-medium">SIRET :</span> 88317839400044</p>
                    <p><span className="font-medium">Immatriculation :</span> 14/01/2025</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Téléphone :</span> 0652641056</p>
                    <p><span className="font-medium">Email :</span> <a href="mailto:contact@agenzys.fr" className="text-orange-500 hover:underline">contact@agenzys.fr</a></p>
                    <p><span className="font-medium">Début d'activité :</span> 30/04/2025</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="font-medium">Activité :</span> Programmation informatique, développement web, automatisation IA pour agences immobilières
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Hébergeur
                </h2>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                  <p className="font-medium text-neutral-800 dark:text-white">Vercel Inc.</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                    Email : <a href="mailto:support@vercel.com" className="text-orange-500 hover:underline">support@vercel.com</a>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">Propriété intellectuelle</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Tous les contenus du site sont protégés par le droit d'auteur. Reproduction interdite sans autorisation.
                  </p>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">Contact</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Questions ou signalements : <a href="mailto:contact@agenzys.fr" className="text-orange-500 hover:underline">contact@agenzys.fr</a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Mis à jour le 04 août 2025
              </p>
            </div>
          </div>
        )

      case 'privacy':
        return (
          <div className="space-y-8">
            <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
              <h1 className="text-3xl font-bold text-neutral-800 dark:text-white">Politique de Confidentialité</h1>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2">Protection de vos données personnelles conforme au RGPD</p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-400 mb-3">En résumé</h2>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                Nous respectons votre vie privée et protégeons vos données selon les standards RGPD. 
                Vos données ne sont utilisées que pour nos services et ne sont jamais vendues.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Données collectées
                </h2>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-orange-600 dark:text-orange-400">📧</span>
                      </div>
                      <p className="font-medium">Email</p>
                      <p className="text-neutral-600 dark:text-neutral-400">Pour vous contacter</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-orange-600 dark:text-orange-400">📱</span>
                      </div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-neutral-600 dark:text-neutral-400">Pour les RDV</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-orange-600 dark:text-orange-400">👤</span>
                      </div>
                      <p className="font-medium">Nom</p>
                      <p className="text-neutral-600 dark:text-neutral-400">Identification</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Utilisation des données
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800 dark:text-green-400 mb-2">RDV & Diagnostics</h3>
                    <p className="text-sm text-green-700 dark:text-green-300">Gérer vos demandes et planifier les interventions</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Amélioration</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Optimiser nos services d'automatisation</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-purple-800 dark:text-purple-400 mb-2">Communication</h3>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Informations sur nos offres (avec votre accord)</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Conservation
                  </h3>
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="font-medium text-blue-600 dark:text-blue-400">3 ans</span> pour les prospects
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      Puis suppression ou anonymisation
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Sécurité
                  </h3>
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Cryptage et mesures de protection
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      Accès sécurisé uniquement
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-400 mb-3">Vos droits RGPD</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-amber-700 dark:text-amber-300">Accès</p>
                    <p className="text-amber-600 dark:text-amber-400">Voir vos données</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-amber-700 dark:text-amber-300">Rectification</p>
                    <p className="text-amber-600 dark:text-amber-400">Corriger vos données</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-amber-700 dark:text-amber-300">Suppression</p>
                    <p className="text-amber-600 dark:text-amber-400">Effacer vos données</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-amber-700 dark:text-amber-300">Opposition</p>
                    <p className="text-amber-600 dark:text-amber-400">Refuser le traitement</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Contactez-nous : <a href="mailto:contact@agenzys.fr" className="font-medium hover:underline">contact@agenzys.fr</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Mis à jour le 04 août 2025 • Conforme RGPD
              </p>
            </div>
          </div>
        )

      case 'cgu':
        return (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1>Conditions Générales d'Utilisation (CGU)</h1>

            <h2>Préambule</h2>
            <p>Les présentes CGU régissent l'utilisation du site Agenzys (https://agenzys.vercel.app), édité par Thomas David Joseph Bouziza (SIREN 883 178 394, siège : 9 Voie de l'Ordonnée, Résidence Les Falaises, 27100 Val-de-Reuil, France). En accédant au site, vous acceptez ces conditions sans réserve.</p>

            <h2>Objet</h2>
            <p>Le site propose des informations sur nos services d'automatisation pour agences immobilières. Il permet de prendre RDV pour un diagnostic.</p>

            <h2>Accès au site</h2>
            <p>Le site est accessible gratuitement. Nous nous réservons le droit de le modifier ou suspendre sans préavis.</p>

            <h2>Propriété intellectuelle</h2>
            <p>Tous les éléments du site sont protégés. Toute reproduction est interdite sans autorisation.</p>

            <h2>Données personnelles</h2>
            <p>Voir notre Politique de Confidentialité.</p>

            <h2>Responsabilité</h2>
            <p>Agenzys n'est pas responsable des dommages résultant de l'utilisation du site. Vous utilisez le site sous votre responsabilité.</p>

            <h2>Liens hypertextes</h2>
            <p>Le site peut contenir des liens vers des tiers. Nous ne contrôlons pas leur contenu.</p>

            <h2>Modification des CGU</h2>
            <p>Nous pouvons modifier ces CGU. Les changements sont effectifs dès publication. Consultez-les régulièrement.</p>

            <h2>Loi applicable</h2>
            <p>Ces CGU sont régies par le droit français. En cas de litige, les tribunaux de Rouen sont compétents (compte tenu de votre siège social).</p>

            <h2>Acceptation</h2>
            <p>En utilisant le site, vous acceptez ces CGU. Pour une acceptation expresse (ex. : lors d'un formulaire), cochez la case dédiée.</p>

            <p><em>Date de dernière mise à jour : 04 août 2025.</em></p>
          </div>
        )

      case 'cgv':
        return (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1>Conditions Générales de Vente (CGV)</h1>

            <h2>Préambule</h2>
            <p>Les présentes CGV s'appliquent à tous les services d'automatisation proposés par Agenzys, édité par Thomas David Joseph Bouziza (SIREN 883 178 394). Elles complètent les CGU et s'appliquent dès acceptation d'un devis ou contrat.</p>

            <h2>Objet</h2>
            <p>Agenzys fournit des services d'automatisation sur-mesure pour agences immobilières, intégrés aux outils existants du client.</p>

            <h2>Commande et Prix</h2>
            <p>Les prix sont communiqués sur devis personnalisé après RDV diagnostic. Toute commande est confirmée par un contrat écrit. Les prix sont en euros, hors taxes (TVA applicable selon taux en vigueur).</p>

            <h2>Paiement</h2>
            <p>Paiement par virement ou autre moyen convenu, dans les 30 jours suivant la facture.</p>

            <h2>Prestation et Délais</h2>
            <p>Les services sont fournis selon le devis. Délais indicatifs ; retards non imputables à Agenzys n'ouvrent pas droit à annulation.</p>

            <h2>Garantie et Responsabilité</h2>
            <p>Agenzys garantit la conformité des services. Responsabilité limitée au montant du contrat. Pas de garantie pour interruptions dues au client.</p>

            <h2>Résiliation</h2>
            <p>Possible par notification écrite, avec préavis de 30 jours. Remboursement prorata pour services non fournis.</p>

            <h2>Données et Confidentialité</h2>
            <p>Voir Politique de Confidentialité. Le client reste responsable de ses données.</p>

            <h2>Litiges</h2>
            <p>Droit français applicable. Médiation possible via le Médiateur des Entreprises. Tribunaux de Rouen compétents.</p>

            <h2>Acceptation</h2>
            <p>Le client accepte ces CGV en signant le devis ou contrat.</p>

            <p><em>Date de dernière mise à jour : 04 août 2025.</em></p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Bouton retour */}
        <Link 
          href="/" 
          className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation légale */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-white">
                Informations Légales
              </h2>
              <nav className="space-y-2">
                {legalSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 font-medium'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-800 dark:hover:text-neutral-200'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Contenu */}
          <div className="lg:w-3/4">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}