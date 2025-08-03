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
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1>Mentions Légales</h1>
            
            <h2>Éditeur du site</h2>
            <p>Le site Agenzys (<a href="https://agenzys.vercel.app">https://agenzys.vercel.app</a>) est édité par Thomas David Joseph Bouziza, entrepreneur individuel, dont le siège social est situé à 9 Voie de l'Ordonnée, Résidence Les Falaises, 27100 Val-de-Reuil, France.</p>
            
            <ul>
              <li><strong>Nature de l'entreprise :</strong> Commerciale, Libérale non règlementée.</li>
              <li><strong>SIREN :</strong> 883 178 394.</li>
              <li><strong>SIRET (siège) :</strong> 88317839400044.</li>
              <li><strong>Date d'immatriculation au RNE :</strong> 14/01/2025.</li>
              <li><strong>Début d'activité :</strong> 30/04/2025.</li>
              <li><strong>Activité principale :</strong> Programmation informatique, développement web, automatisation IA (y compris services d'automatisation pour agences immobilières).</li>
              <li><strong>Directeur de la publication :</strong> Thomas David Joseph Bouziza.</li>
              <li><strong>Téléphone :</strong> 0652641056.</li>
              <li><strong>E-mail :</strong> contact@agenzys.fr (ou thomasbouziza@icloud.com pour contacts personnels).</li>
            </ul>

            <h2>Hébergeur du site</h2>
            <p>Le site est hébergé par Vercel Inc., dont le siège social est situé à 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>
            <ul>
              <li><strong>Téléphone :</strong> +1 (559) 288-7060.</li>
              <li><strong>E-mail :</strong> support@vercel.com.</li>
            </ul>

            <h2>Propriété intellectuelle</h2>
            <p>Tous les contenus du site (textes, images, logos) sont protégés par le droit d'auteur. Toute reproduction sans autorisation est interdite.</p>

            <h2>Responsabilité</h2>
            <p>Les informations sur ce site sont fournies à titre indicatif. Agenzys ne saurait être tenu responsable des erreurs ou omissions. L'utilisation du site se fait sous la responsabilité de l'utilisateur.</p>

            <h2>Données personnelles</h2>
            <p>Conformément au RGPD, les données collectées sont traitées avec confidentialité. Pour plus de détails, consultez notre Politique de Confidentialité.</p>

            <h2>Contact</h2>
            <p>Pour toute question ou signalement de contenu illicite, contactez-nous à contact@agenzys.fr.</p>
            
            <p><em>Ces mentions sont accessibles en permanence et mises à jour au 04 août 2025.</em></p>
          </div>
        )

      case 'privacy':
        return (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1>Politique de Confidentialité</h1>

            <h2>Introduction</h2>
            <p>Agenzys, édité par Thomas David Joseph Bouziza (SIREN 883 178 394), respecte la vie privée de ses utilisateurs et s'engage à protéger les données personnelles collectées via le site https://agenzys.vercel.app, conformément au RGPD (Règlement (UE) 2016/679). Cette politique explique comment nous collectons, utilisons et protégeons vos données.</p>

            <h2>Données collectées</h2>
            <p>Nous collectons des données comme : nom, e-mail, téléphone, lors de prises de RDV ou de contacts. Ces données sont recueillies via formulaires ou cookies (avec votre consentement).</p>

            <h2>Finalités du traitement</h2>
            <ul>
              <li>Gérer les demandes de RDV et diagnostics.</li>
              <li>Améliorer nos services d'automatisation.</li>
              <li>Envoyer des informations sur nos offres (avec opt-in).</li>
            </ul>
            <p><strong>Base légale :</strong> consentement, exécution d'un contrat ou intérêt légitime.</p>

            <h2>Destinataires des données</h2>
            <p>Les données sont accessibles à notre équipe interne et à des sous-traitants (ex. : hébergeur Vercel). Pas de transfert hors UE sans garanties adéquates.</p>

            <h2>Durée de conservation</h2>
            <p>Les données sont conservées pendant 3 ans pour les prospects, puis supprimées ou anonymisées.</p>

            <h2>Vos droits</h2>
            <p>Vous avez le droit d'accès, de rectification, de suppression, d'opposition, de portabilité et de limitation du traitement. Contactez-nous à contact@agenzys.fr pour exercer ces droits. Vous pouvez aussi porter réclamation auprès de la CNIL (www.cnil.fr).</p>

            <h2>Sécurité</h2>
            <p>Nous utilisons des mesures de sécurité (cryptage, etc.) pour protéger vos données contre les accès non autorisés.</p>

            <h2>Cookies</h2>
            <p>Le site utilise des cookies pour analyser le trafic. Vous pouvez les refuser via votre navigateur. Pour plus de détails, consultez notre bannière cookies.</p>

            <h2>Modifications</h2>
            <p>Cette politique peut être mise à jour. Date de dernière mise à jour : 04 août 2025.</p>
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