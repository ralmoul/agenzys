import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { marked } from 'marked';
import axios from 'axios';

// Configuration OpenAI (avec fallback pour éviter erreur build)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

// Configuration Perplexity
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || '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';

// SUJETS ULTRA-CIBLÉS SEO IMMOBILIER 
const ARTICLE_TOPICS = [
  {
    title: "Marketing Automation Immobilier 2025 : Guide Complet pour Agences",
    keywords: ["marketing automation immobilier", "automatisation agence immobilière", "CRM immobilier 2025"],
    category: "Automatisation",
    type: "evergreen"
  },
  {
    title: "Comment Générer +300% de Leads Immobiliers avec l'IA en 2025",
    keywords: ["leads immobilier IA", "génération prospects immobilier", "intelligence artificielle immobilier"],
    category: "Lead Generation",
    type: "evergreen"
  },
  {
    title: "CRM Immobilier : Top 10 des Solutions pour Doubler vos Ventes",
    keywords: ["meilleur CRM immobilier", "logiciel gestion agence", "CRM agent immobilier"],
    category: "CRM",
    type: "evergreen"
  },
  {
    title: "SEO Immobilier Local : Dominez Google en 90 Jours",
    keywords: ["SEO immobilier local", "référencement agence immobilière", "Google My Business immobilier"],
    category: "SEO",
    type: "evergreen"
  },
  {
    title: "Facebook Ads Immobilier : Stratégies qui Génèrent des Mandats",
    keywords: ["Facebook Ads immobilier", "publicité immobilière Facebook", "campagne acquisition mandats"],
    category: "Publicité",
    type: "evergreen"
  }
];

// SUJETS D'ACTUALITÉ IMMOBILIÈRE (Perplexity)
const NEWS_TOPICS = [
  {
    search: "actualité immobilier France 2025 nouveaux décrets lois",
    keywords: ["actualité immobilier", "loi immobilière 2025", "décret immobilier"],
    category: "Actualité",
    type: "news"
  },
  {
    search: "marché immobilier français janvier 2025 prix évolution tendances",
    keywords: ["marché immobilier 2025", "prix immobilier France", "tendances immobilières"],
    category: "Marché",
    type: "news"
  },
  {
    search: "nouvelles technologies PropTech 2025 innovation immobilier digital",
    keywords: ["PropTech 2025", "innovation immobilière", "technologie immobilier"],
    category: "Innovation",
    type: "news"
  },
  {
    search: "crédit immobilier taux intérêt 2025 banques nouvelles conditions",
    keywords: ["taux immobilier 2025", "crédit immobilier", "financement immobilier"],
    category: "Financement",
    type: "news"
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

// FONCTION PERPLEXITY SONAR PRO - Recherche actualité immobilière
async function getLatestRealEstateNews(searchQuery: string) {
  try {
    console.log(`🔍 Recherche Perplexity: "${searchQuery}"`);
    
    const response = await axios.post('https://api.perplexity.ai/chat/completions', {
      model: "llama-3.1-sonar-huge-128k-online",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en actualité immobilière française. Recherche et résume les informations les plus récentes et pertinentes sur le secteur immobilier français."
        },
        {
          role: "user",
          content: `Recherche les dernières actualités sur : ${searchQuery}. 

Fournis un résumé structuré avec :
- Les 3-5 informations les plus importantes et récentes
- Dates précises si disponibles
- Sources fiables mentionnées
- Impact sur les agences immobilières
- Chiffres et statistiques récents
- Évolutions réglementaires ou de marché

Format: texte structuré avec détails factuels et sources.`
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    }, {
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const newsContent = response.data.choices[0]?.message?.content || '';
    console.log(`✅ Perplexity: ${newsContent.length} caractères d'actualités`);
    
    return newsContent;
    
  } catch (error) {
    console.error('❌ Erreur Perplexity:', error);
    return 'Actualités immobilières non disponibles. Contenu basé sur les tendances générales du secteur.';
  }
}

// FONCTION HYBRIDE - Perplexity + GPT-4 pour articles d'actualité
async function generateNewsArticle(newsTopic: any) {
  try {
    console.log(`📰 Génération article actualité: "${newsTopic.search}"`);
    
    // 1. Recherche actualité avec Perplexity
    const latestNews = await getLatestRealEstateNews(newsTopic.search);
    
    // 2. GPT-4 structure l'article avec les infos Perplexity
    if (!openai) {
      throw new Error('OpenAI not configured');
    }
    
    const hybridPrompt = `Tu es un expert en rédaction d'articles d'actualité immobilière SEO.

MISSION: Rédige un article de blog d'actualité ULTRA-OPTIMISÉ SEO basé sur ces informations récentes.

INFORMATIONS D'ACTUALITÉ (Perplexity):
${latestNews}

MOTS-CLÉS À INTÉGRER: ${newsTopic.keywords.join(', ')}

STRUCTURE ARTICLE ACTUALITÉ:
1. **Titre accrocheur** avec date/mois 2025
2. **Introduction** (150 mots) - Résumé des points clés + impact Agenzys
3. **## Les points clés de l'actualité** (400 mots) - Détail des infos avec dates
4. **## Impact pour les agences immobilières** (400 mots) - Conséquences pratiques
5. **## Comment Agenzys vous aide à vous adapter** (400 mots) - Solutions spécifiques
6. **## Analyse d'expert et recommandations** (300 mots) - Conseils stratégiques
7. **## Conclusion et plan d'action** (200 mots) - CTA Agenzys

CONTRAINTES SEO:
- 1800-2200 mots
- Inclure dates précises et sources
- Ton journalistique mais expert
- CTA Agenzys tous les 300 mots
- Liens vers https://agenzys.vercel.app
- Chiffres et statistiques mis en avant

Format Markdown avec # ## ### et **gras**.`;

    const articleResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: hybridPrompt
      }],
      temperature: 0.6,
      max_tokens: 8000,
    });

    const articleContent = String(await marked(articleResponse.choices[0]?.message?.content || ''));
    
    // 3. Générer titre optimisé
    const titleResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: `Génère un titre SEO parfait (50-60 caractères) pour cet article d'actualité immobilière basé sur : ${newsTopic.search}. 

Inclure mois/année 2025 et mot-clé principal : ${newsTopic.keywords[0]}`
      }],
      temperature: 0.7,
      max_tokens: 100,
    });

    const title = titleResponse.choices[0]?.message?.content?.replace(/"/g, '').trim() || newsTopic.search;

    return {
      title,
      content: articleContent,
      category: newsTopic.category,
      keywords: newsTopic.keywords,
      newsContent: latestNews,
      type: 'news'
    };
    
  } catch (error) {
    console.error('❌ Erreur génération actualité:', error);
    throw error;
  }
}`;

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
    const content = String(await marked(contentMarkdown));

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

    console.log(`✅ Article généré: ${content?.length || 0} caractères`);

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
    const { topic, type = 'auto' } = await request.json().catch(() => ({}));

    let selectedTopic = topic;
    let articleData;
    
    if (!selectedTopic) {
      // SYSTÈME INTELLIGENT: 70% evergreen, 30% actualité
      const useNews = Math.random() < 0.3;
      
      if (useNews) {
        // Sélectionner sujet d'actualité
        selectedTopic = NEWS_TOPICS[Math.floor(Math.random() * NEWS_TOPICS.length)];
        console.log(`📰 Sujet actualité sélectionné: "${selectedTopic.search}"`);
        
        // Générer article hybride Perplexity + GPT-4
        const newsResult = await generateNewsArticle(selectedTopic);
        
        // Générer excerpt et image comme d'habitude
        const excerpt = await generateExcerpt(newsResult.title);
        const { imageUrl, imageAlt } = await generateImageAndAlt(newsResult.title);
        
        articleData = {
          ...newsResult,
          excerpt,
          image: imageUrl,
          imageAlt,
          generation_method: 'Perplexity Sonar Pro + GPT-4'
        };
        
      } else {
        // Sélectionner sujet evergreen classique
        selectedTopic = ARTICLE_TOPICS[Math.floor(Math.random() * ARTICLE_TOPICS.length)];
        console.log(`🎯 Sujet evergreen sélectionné: "${selectedTopic.title}"`);
        
        articleData = await generateArticleContent(selectedTopic);
        articleData.generation_method = 'GPT-4 + DALL-E';
      }
    } else {
      // Si sujet spécifique fourni
      articleData = await generateArticleContent(selectedTopic);
      articleData.generation_method = 'GPT-4 + DALL-E';
    }

    return NextResponse.json({
      success: true,
      message: `Article généré avec ${articleData.generation_method}`,
      article: articleData,
      seo_optimized: true,
      content_type: articleData.type || 'evergreen',
    });

  } catch (error) {
    console.error('❌ Erreur génération:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

// Fonctions utilitaires pour réutiliser excerpt et image
async function generateExcerpt(title: string) {
  if (!openai) return `Guide complet sur ${title.toLowerCase()}. Découvrez les stratégies d'experts et solutions Agenzys.`;
  
  try {
    const excerptResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: `Génère une meta description SEO (140-160 caractères) pour "${title}". Inclure un CTA et le mot-clé principal.`
      }],
      temperature: 0.6,
      max_tokens: 100,
    });
    
    return excerptResponse.choices[0]?.message?.content?.replace(/"/g, '').trim() || '';
  } catch {
    return `Guide complet sur ${title.toLowerCase()}. Stratégies éprouvées et solutions Agenzys.`;
  }
}

async function generateImageAndAlt(title: string) {
  let imageUrl = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
  let imageAlt = `Illustration ${title}`;
  
  if (!openai) return { imageUrl, imageAlt };
  
  try {
    // Générer image DALL-E
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: IMAGE_PROMPT.replace('{topic}', title),
      size: "1792x1024",
      quality: "standard",
      n: 1,
    });
    
    imageUrl = imageResponse.data?.[0]?.url || imageUrl;
    
    // Générer alt text
    const altResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: `Alt text SEO (125 caractères max) pour image illustrant "${title}".`
      }],
      temperature: 0.5,
      max_tokens: 50,
    });
    
    imageAlt = altResponse.choices[0]?.message?.content?.replace(/"/g, '').trim() || imageAlt;
    
  } catch (error) {
    console.error('⚠️ Erreur génération image:', error);
  }
  
  return { imageUrl, imageAlt };
}