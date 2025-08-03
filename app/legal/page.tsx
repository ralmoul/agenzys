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
            </div>
            
            <div className="grid gap-6 md:gap-8">
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Protection de vos données personnelles
                </h2>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Agenzys respecte votre vie privée et protège vos données selon les standards RGPD. Vos données ne sont utilisées que pour nos services et ne sont jamais vendues.
                </p>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="font-medium">Conformité RGPD :</span> Règlement (UE) 2016/679 respecté intégralement
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Données collectées
                </h2>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-medium text-neutral-800 dark:text-white">Email</p>
                      <p className="text-neutral-600 dark:text-neutral-400">Pour vous contacter</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-neutral-800 dark:text-white">Téléphone</p>
                      <p className="text-neutral-600 dark:text-neutral-400">Pour les RDV</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-neutral-800 dark:text-white">Nom</p>
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
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                    <h3 className="font-medium text-neutral-800 dark:text-white mb-2">RDV & Diagnostics</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Gérer vos demandes et planifier les interventions</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                    <h3 className="font-medium text-neutral-800 dark:text-white mb-2">Amélioration</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Optimiser nos services d'automatisation</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                    <h3 className="font-medium text-neutral-800 dark:text-white mb-2">Communication</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Informations sur nos offres (avec votre accord)</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">Conservation des données</h3>
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="font-medium">3 ans</span> pour les prospects, puis suppression ou anonymisation
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">Sécurité</h3>
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Cryptage et mesures de protection, accès sécurisé uniquement
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Vos droits RGPD
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-neutral-800 dark:text-white">Accès</p>
                    <p className="text-neutral-600 dark:text-neutral-400">Voir vos données</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-neutral-800 dark:text-white">Rectification</p>
                    <p className="text-neutral-600 dark:text-neutral-400">Corriger vos données</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-neutral-800 dark:text-white">Suppression</p>
                    <p className="text-neutral-600 dark:text-neutral-400">Effacer vos données</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-neutral-800 dark:text-white">Opposition</p>
                    <p className="text-neutral-600 dark:text-neutral-400">Refuser le traitement</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Contactez-nous : <a href="mailto:contact@agenzys.fr" className="text-orange-500 hover:underline">contact@agenzys.fr</a>
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

      case 'cgu':
        return (
          <div className="space-y-8">
            <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
              <h1 className="text-3xl font-bold text-neutral-800 dark:text-white">Conditions Générales d'Utilisation</h1>
            </div>
            
            <div className="grid gap-6 md:gap-8">
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  En utilisant ce site
                </h2>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Vous acceptez automatiquement ces conditions d'utilisation. Le site est gratuit et vous permet de découvrir nos services d'automatisation.
                </p>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="font-medium">Acceptation automatique :</span> L'accès au site vaut acceptation des présentes CGU
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Objet du site
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                    <h3 className="font-medium text-neutral-800 dark:text-white mb-2">Services proposés</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Informations sur nos solutions d'automatisation pour agences immobilières
                    </p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                    <h3 className="font-medium text-neutral-800 dark:text-white mb-2">Prise de rendez-vous</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Planification de diagnostics gratuits pour vos besoins
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">Accès gratuit</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Le site est accessible gratuitement. Nous pouvons le modifier ou le suspendre sans préavis.
                  </p>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">Propriété intellectuelle</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Tous les éléments du site sont protégés. Reproduction interdite sans autorisation.
                  </p>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">Responsabilité</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Utilisation sous votre responsabilité. Agenzys n'est pas responsable des dommages.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Aspects légaux
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
                    <h4 className="font-medium text-neutral-800 dark:text-white mb-2">Droit applicable</h4>
                    <p className="text-neutral-600 dark:text-neutral-400">Droit français • Tribunaux de Rouen compétents</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
                    <h4 className="font-medium text-neutral-800 dark:text-white mb-2">Modifications</h4>
                    <p className="text-neutral-600 dark:text-neutral-400">CGU modifiables • Changements effectifs dès publication</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">Données personnelles & Liens</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
                    <h4 className="font-medium text-neutral-800 dark:text-white mb-2">Vos données</h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Consultez notre <span className="font-medium">Politique de Confidentialité</span> pour tout savoir sur le traitement de vos données.
                    </p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
                    <h4 className="font-medium text-neutral-800 dark:text-white mb-2">Liens externes</h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Le site peut contenir des liens vers des sites tiers dont nous ne contrôlons pas le contenu.
                    </p>
                  </div>
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

      case 'cgv':
        return (
          <div className="space-y-8">
            <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
              <h1 className="text-3xl font-bold text-neutral-800 dark:text-white">Conditions Générales de Vente</h1>
            </div>
            
            <div className="grid gap-6 md:gap-8">
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Services professionnels
                </h2>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Ces conditions s'appliquent dès la signature d'un devis ou contrat pour nos services d'automatisation sur-mesure.
                </p>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="font-medium">Automatisation sur-mesure :</span> Solutions intégrées à vos outils existants (Hektor, Adapt Immo, Leizee, etc.)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Commande & Prix
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">Devis personnalisé</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">Après RDV diagnostic gratuit</p>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">Contrat écrit</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">Confirmation de toute commande</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">Paiement</h3>
                  <div className="space-y-3">
                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">30 jours</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">Délai de paiement après facture</p>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">Virement bancaire</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">Ou autre moyen convenu</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Prestation & Garanties
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 text-center">
                    <h4 className="font-medium text-neutral-800 dark:text-white mb-2">Délais</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Selon devis</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500">Indicatifs</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 text-center">
                    <h4 className="font-medium text-neutral-800 dark:text-white mb-2">Garantie</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Conformité</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500">Des services</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 text-center">
                    <h4 className="font-medium text-neutral-800 dark:text-white mb-2">Responsabilité</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Limitée</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500">Au montant du contrat</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">Résiliation</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-neutral-600 dark:text-neutral-400"><span className="font-medium">Préavis :</span> 30 jours</p>
                    <p className="text-neutral-600 dark:text-neutral-400"><span className="font-medium">Notification :</span> Par écrit</p>
                    <p className="text-neutral-600 dark:text-neutral-400"><span className="font-medium">Remboursement :</span> Prorata des services non fournis</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">Litiges</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-neutral-600 dark:text-neutral-400"><span className="font-medium">Droit :</span> Français</p>
                    <p className="text-neutral-600 dark:text-neutral-400"><span className="font-medium">Médiation :</span> Médiateur des Entreprises</p>
                    <p className="text-neutral-600 dark:text-neutral-400"><span className="font-medium">Tribunaux :</span> Rouen</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">Données & Confidentialité</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  La gestion de vos données est détaillée dans notre <span className="font-medium text-orange-600 dark:text-orange-400">Politique de Confidentialité</span>. 
                  Vous restez responsable de vos données et de leur sauvegarde.
                </p>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Mis à jour le 04 août 2025
              </p>
            </div>
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