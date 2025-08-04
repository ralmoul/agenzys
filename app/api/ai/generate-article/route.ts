import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { marked } from 'marked';

// Configuration OpenAI (avec fallback pour éviter erreur build)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

// SUJETS ULTRA-CIBLÉS SEO IMMOBILIER 
const ARTICLE_TOPICS = [
  {
    title: "Marketing Automation Immobilier 2025 : Guide Complet pour Agences",
    keywords: ["marketing automation immobilier", "automatisation agence immobilière", "CRM immobilier 2025"],
    category: "Automatisation"
  },
  {
    title: "Comment Générer +300% de Leads Immobiliers avec l'IA en 2025",
    keywords: ["leads immobilier IA", "génération prospects immobilier", "intelligence artificielle immobilier"],
    category: "Lead Generation"
  },
  {
    title: "CRM Immobilier : Top 10 des Solutions pour Doubler vos Ventes",
    keywords: ["meilleur CRM immobilier", "logiciel gestion agence", "CRM agent immobilier"],
    category: "CRM"
  },
  {
    title: "SEO Immobilier Local : Dominez Google en 90 Jours",
    keywords: ["SEO immobilier local", "référencement agence immobilière", "Google My Business immobilier"],
    category: "SEO"
  },
  {
    title: "Facebook Ads Immobilier : Stratégies qui Génèrent des Mandats",
    keywords: ["Facebook Ads immobilier", "publicité immobilière Facebook", "campagne acquisition mandats"],
    category: "Publicité"
  }
];

// PROMPT ULTRA-OPTIMISÉ SEO pour GPT-4
const ARTICLE_PROMPT = `Tu es un expert en marketing digital immobilier et rédacteur SEO professionnel. 

Rédige un article de blog ULTRA-OPTIMISÉ SEO sur : {topic}

CONTRAINTES SEO STRICTES :
- Longueur : 2500-3500 mots MINIMUM
- Structure H1 > H2 > H3 > H4 parfaite
- Inclure naturellement : {keywords} (densité 1-2%)
- Ton professionnel expert, vouvoiement
- CTA vers Agenzys tous les 300 mots
- Liens internes vers pages Agenzys
- Statistiques récentes (2024-2025)
- Exemples concrets secteur immobilier français

STRUCTURE OBLIGATOIRE DÉTAILLÉE :
1. **Introduction accrocheuse** (200 mots)
   - Hook avec statistique choc
   - Problème concret d'agences immobilières
   - Solution Agenzys en 2-3 phrases
   - CTA discret vers https://agenzys.vercel.app

2. **## Pourquoi {topic} est crucial en 2025** (400 mots)
   - 3 statistiques récentes du marché immobilier
   - Évolution comportement consommateurs
   - Impact sur chiffre d'affaires agences
   - CTA : "Découvrez comment Agenzys transforme votre approche"

3. **## Les 5 défis majeurs des agences immobilières** (500 mots)
   - Détailler chaque défi avec exemples
   - Chiffres et impact business
   - Témoignages fictifs mais réalistes

4. **## Solutions complètes avec Agenzys** (600 mots)
   - Comment Agenzys résout chaque problème
   - Fonctionnalités spécifiques
   - ROI et bénéfices mesurables
   - CTA : "Testez gratuitement sur https://agenzys.vercel.app"

5. **## Guide pratique : mise en œuvre étape par étape** (600 mots)
   - 8-10 étapes détaillées
   - Actions concrètes à implémenter
   - Timeline et planning
   - Outils complémentaires

6. **## Outils et intégrations recommandés** (400 mots)
   - Stack technologique immobilier
   - Intégrations Agenzys (CRM, portails, etc.)
   - Comparatif solutions marché

7. **## Top 7 erreurs à éviter absolument** (400 mots)
   - Erreurs coûteuses d'agences
   - Comment les éviter
   - Bonnes pratiques

8. **## Études de cas et résultats clients** (300 mots)
   - 2-3 cas concrets avec chiffres
   - Avant/après avec Agenzys
   - Témoignages détaillés

9. **## Conclusion et plan d'action** (200 mots)
   - Récapitulatif points clés
   - CTA fort : "Commencez votre transformation dès aujourd'hui"
   - Lien vers https://agenzys.vercel.app

LIENS INTERNES À INTÉGRER :
- Lien vers page principale : https://agenzys.vercel.app
- Lien vers blog : https://agenzys.vercel.app/blog
- Lien vers fonctionnalités : https://agenzys.vercel.app/#features
- Lien vers tarifs : https://agenzys.vercel.app/#pricing
- Lien vers FAQ : https://agenzys.vercel.app/#faq

ÉLÉMENTS SEO AVANCÉS :
- Utiliser des listes numérotées et à puces
- Inclure des tableaux comparatifs
- Ajouter des citations d'experts
- Mentionner des marques connues (SeLoger, LeBonCoin, etc.)
- Références à des villes françaises majeures
- Vocabulaire technique précis mais accessible

CALL-TO-ACTION VARIÉS :
- "Découvrez Agenzys en action"
- "Testez gratuitement pendant 14 jours"
- "Rejoignez +500 agences qui font confiance à Agenzys"
- "Obtenez une démo personnalisée"

Format en Markdown avec # ## ### #### et **gras** pour les points importants.`;

// PROMPT DALL-E pour images
const IMAGE_PROMPT = `Professional real estate technology illustration for "{topic}". 
Modern office, technology devices, real estate symbols, clean design, 
blue and orange colors, no text, 16:9 ratio, professional lighting.`;

// Génération d'article avec OpenAI
async function generateArticleContent(topicData: any) {
  try {
    console.log(`🤖 Génération GPT-4: "${topicData.title}"`);
    
    // Vérifier si OpenAI est disponible
    if (!openai) {
      throw new Error('OpenAI not configured');
    }
    
    // 1. Contenu principal
    const contentResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: ARTICLE_PROMPT
          .replace('{topic}', topicData.title)
          .replace('{keywords}', topicData.keywords.join(', '))
      }],
      temperature: 0.7,
      max_tokens: 8000,
    });

    const contentMarkdown = contentResponse.choices[0]?.message?.content || '';
    
    // Convertir Markdown en HTML pour l'affichage
    const content = marked(contentMarkdown);

    // 2. Excerpt SEO
    const excerptResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: `Génère une meta description SEO (140-160 caractères) pour "${topicData.title}". Inclure le mot-clé principal et un CTA.`
      }],
      temperature: 0.6,
      max_tokens: 100,
    });

    const excerpt = excerptResponse.choices[0]?.message?.content?.replace(/"/g, '').trim() || '';

    // 3. Image DALL-E 3
    console.log(`🎨 Génération DALL-E: "${topicData.title}"`);
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: IMAGE_PROMPT.replace('{topic}', topicData.title),
      size: "1792x1024",
      quality: "standard",
      n: 1,
    });

    const imageUrl = imageResponse.data?.[0]?.url || '';

    // 4. Alt text SEO
    const altResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: `Alt text SEO (125 caractères max) pour image illustrant "${topicData.title}". Inclure mot-clé: ${topicData.keywords[0]}`
      }],
      temperature: 0.5,
      max_tokens: 50,
    });

    const imageAlt = altResponse.choices[0]?.message?.content?.replace(/"/g, '').trim() || topicData.title;

    console.log(`✅ Article généré: ${content.length} caractères`);

    return {
      title: topicData.title,
      excerpt,
      content,
      category: topicData.category,
      keywords: topicData.keywords,
      image: imageUrl,
      imageAlt,
    };

  } catch (error) {
    console.error('❌ Erreur OpenAI:', error);
    
    return {
      title: topicData.title,
      excerpt: `Guide complet sur ${topicData.title.toLowerCase()}. Stratégies éprouvées et solutions Agenzys pour transformer votre agence immobilière.`,
      content: `# ${topicData.title}\n\n## Introduction\n\nArticle en cours de génération par notre IA. Contenu de qualité arrive bientôt !`,
      category: topicData.category,
      keywords: topicData.keywords,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      imageAlt: `Illustration ${topicData.title}`,
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json().catch(() => ({}));

    let selectedTopic = topic;
    if (!selectedTopic) {
      selectedTopic = ARTICLE_TOPICS[Math.floor(Math.random() * ARTICLE_TOPICS.length)];
      console.log(`🎯 Sujet sélectionné: "${selectedTopic.title}"`);
    }

    const articleData = await generateArticleContent(selectedTopic);

    return NextResponse.json({
      success: true,
      message: 'Article généré avec GPT-4 + DALL-E',
      article: articleData,
      seo_optimized: true,
    });

  } catch (error) {
    console.error('❌ Erreur génération:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}