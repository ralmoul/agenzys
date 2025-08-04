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

// PROMPT OPTIMISÉ SEO pour GPT-4 (version raccourcie)
const ARTICLE_PROMPT = `Expert SEO immobilier. Rédige article blog sur : {topic}

CONTRAINTES :
- 2000-3000 mots 
- Structure H1 > H2 > H3
- Mots-clés : {keywords} (1-2% densité)
- CTA Agenzys tous les 300 mots
- Liens cliquables vers Agenzys

STRUCTURE :
1. **Introduction** (200 mots) - Hook statistique + problème + solution Agenzys
2. **## Pourquoi {topic} crucial 2025** (400 mots) - Stats marché + impact CA
3. **## 5 défis agences immobilières** (500 mots) - Défis détaillés + exemples
4. **## Solutions Agenzys** (600 mots) - Systèmes d'automatisation invisibles + intégration outils existants + ROI + CTA
5. **## Guide pratique étapes** (600 mots) - 8 étapes concrètes + timeline
6. **## Outils recommandés** (400 mots) - Stack tech + intégrations
7. **## 7 erreurs à éviter** (400 mots) - Erreurs coûteuses + bonnes pratiques
8. **## Cas clients** (300 mots) - Résultats concrets + témoignages
9. **## Conclusion** (200 mots) - Récap + CTA fort

LIENS CLIQUABLES OBLIGATOIRES :
- [Découvrez Agenzys](https://agenzys.vercel.app)
- [Voir nos fonctionnalités](https://agenzys.vercel.app/#features)
- [Demander une démo](https://agenzys.vercel.app)
- [Lire nos articles](https://agenzys.vercel.app/blog)

STYLE : 
- Professionnel, vouvoiement
- Stats 2024-2025 récentes
- Exemples français (Paris, Lyon, Marseille)
- Marques connues (SeLoger, LeBonCoin, Logic-Immo)
- Espacement entre paragraphes

AGENZYS SERVICES (IMPORTANT) :
- Systèmes d'automatisation INVISIBLES
- Connexion directe aux outils EXISTANTS des agences
- Facilitation des tâches répétitives
- PAS de nouveaux outils à apprendre
- Intégration transparente (Hektor, Leizee, Adapt Immo, etc.)

IMPORTANT :
- PAS de "Titre :" au début
- Format Markdown avec # ## ###
- Paragraphes bien espacés avec lignes vides
- Liens en format [texte](url)
- CTA attractifs : "Découvrez Agenzys", "Testez gratuitement", etc.
- NE PAS inventer de fonctionnalités Agenzys !`;

// PROMPT DALL-E pour images
const IMAGE_PROMPT = `Professional real estate technology illustration for "{topic}". 
Modern office, technology devices, real estate symbols, clean design, 
blue and orange colors, no text, 16:9 ratio, professional lighting.`;

// FONCTION PERPLEXITY SONAR PRO - Recherche actualité immobilière
async function getLatestRealEstateNews(searchQuery: string) {
  try {
    console.log(`[PERPLEXITY] Recherche: "${searchQuery}"`);
    
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
    console.log(`[PERPLEXITY] Success: ${newsContent.length} caractères d'actualités`);
    
    return newsContent;
    
  } catch (error) {
    console.error('[PERPLEXITY] Erreur:', error);
    return 'Actualités immobilières non disponibles. Contenu basé sur les tendances générales du secteur.';
  }
}

// FONCTION HYBRIDE - Perplexity + GPT-4 pour articles d'actualité
async function generateNewsArticle(newsTopic: any) {
  try {
    console.log(`[NEWS] Génération article actualité: "${newsTopic.search}"`);
    
    // 1. Recherche actualité avec Perplexity
    const latestNews = await getLatestRealEstateNews(newsTopic.search);
    
    // 2. GPT-4 structure l'article avec les infos Perplexity
    if (!openai) {
      throw new Error('OpenAI not configured');
    }
    
    const hybridPrompt = `Rédacteur actualité immobilière SEO. Article blog basé sur :

ACTUALITÉS:
${latestNews}

MOTS-CLÉS: ${newsTopic.keywords.join(', ')}

STRUCTURE (1800-2200 mots):
1. **Titre** avec date 2025
2. **Introduction** (150 mots) - Points clés + Agenzys
3. **## Actualité détaillée** (400 mots) - Infos + dates
4. **## Impact agences** (400 mots) - Conséquences pratiques
5. **## Solutions Agenzys** (400 mots) - Adaptations
6. **## Analyse expert** (300 mots) - Recommandations
7. **## Conclusion** (200 mots) - CTA

STYLE: Journalistique expert, dates précises, CTA tous les 300 mots, liens https://agenzys.vercel.app

Format Markdown # ## ###.`;

    const articleResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: hybridPrompt
      }],
      temperature: 0.6,
      max_tokens: 7500,
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
    console.error('[NEWS] Erreur génération actualité:', error);
    throw error;
  }
}

// Génération d'article avec OpenAI
async function generateArticleContent(topicData: any) {
  try {
    console.log(`[AI] Génération GPT-4: "${topicData.title}"`);
    
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
      max_tokens: 7500,
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
    console.log(`[DALLE] Génération image: "${topicData.title}"`);
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

    console.log(`[AI] Article généré: ${content?.length || 0} caractères`);

    return {
      title: topicData.title,
      excerpt,
      content,
      category: topicData.category,
      keywords: topicData.keywords,
      image: imageUrl,
      imageAlt,
      generation_method: 'GPT-4 + DALL-E',
      type: 'evergreen',
    };

  } catch (error) {
    console.error('[AI] Erreur OpenAI:', error);
    
    return {
      title: topicData.title,
      excerpt: `Guide complet sur ${topicData.title.toLowerCase()}. Stratégies éprouvées et solutions Agenzys pour transformer votre agence immobilière.`,
      content: `# ${topicData.title}\n\n## Introduction\n\nArticle en cours de génération par notre IA. Contenu de qualité arrive bientôt !`,
      category: topicData.category,
      keywords: topicData.keywords,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      imageAlt: `Illustration ${topicData.title}`,
      generation_method: 'Fallback - OpenAI unavailable',
      type: 'evergreen',
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
        console.log(`[NEWS] Sujet actualité sélectionné: "${selectedTopic.search}"`);
        
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
        console.log(`[AI] Sujet evergreen sélectionné: "${selectedTopic.title}"`);
        
        articleData = await generateArticleContent(selectedTopic);
      }
    } else {
      // Si sujet spécifique fourni
      articleData = await generateArticleContent(selectedTopic);
    }

    return NextResponse.json({
      success: true,
      message: `Article généré avec ${articleData.generation_method}`,
      article: articleData,
      seo_optimized: true,
      content_type: articleData.type || 'evergreen',
    });

  } catch (error) {
    console.error('[AI] Erreur génération:', error);
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

// FONCTION TÉLÉCHARGEMENT ET STOCKAGE D'IMAGE DALL-E
async function downloadAndStoreImage(imageUrl: string, filename: string): Promise<string> {
  try {
    console.log('[DOWNLOAD] Téléchargement image DALL-E...');
    
    // Télécharger l'image depuis DALL-E
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const imageBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(imageBuffer);
    
    // Créer le nom de fichier unique
    const timestamp = Date.now();
    const finalFilename = `${timestamp}-${filename.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.jpg`;
    
    // Préparer les données pour GitHub
    const base64Content = Buffer.from(uint8Array).toString('base64');
    
    // Committer l'image sur GitHub dans public/images/blog/
    const githubResponse = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/public/images/blog/${finalFilename}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add AI-generated blog image: ${finalFilename}`,
        content: base64Content,
        committer: {
          name: 'Agenzys AI',
          email: 'ai@agenzys.com'
        }
      })
    });

    if (!githubResponse.ok) {
      throw new Error(`GitHub API error: ${githubResponse.status}`);
    }

    const localImageUrl = `/images/blog/${finalFilename}`;
    console.log('[DOWNLOAD] Image sauvegardée:', localImageUrl);
    
    return localImageUrl;
    
  } catch (error) {
    console.error('[DOWNLOAD] Erreur téléchargement:', error);
    // Fallback : retourner l'URL originale si le téléchargement échoue
    return imageUrl;
  }
}

async function generateImageAndAlt(title: string) {
  let imageUrl = "/images/blog/default-immobilier.jpg"; // Image par défaut locale
  let imageAlt = `Illustration professionnelle représentant ${title}`;
  
  if (!openai) return { imageUrl, imageAlt };
  
  try {
    console.log('[DALLE] Génération image DALL-E...');
    
    // Générer image DALL-E
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: IMAGE_PROMPT.replace('{topic}', title),
      size: "1792x1024",
      quality: "standard",
      n: 1,
    });
    
    const dalleUrl = imageResponse.data?.[0]?.url;
    
    if (dalleUrl) {
      console.log('[DALLE] Image générée, téléchargement...');
      // Télécharger et stocker l'image localement
      imageUrl = await downloadAndStoreImage(dalleUrl, title);
    }
    
    // Générer alt text optimisé
    const altResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: `Alt text SEO optimisé (100 caractères max) pour "${title}". Inclure mots-clés immobilier, technologie, innovation.`
      }],
      temperature: 0.5,
      max_tokens: 50,
    });
    
    imageAlt = altResponse.choices[0]?.message?.content?.replace(/"/g, '').trim() || imageAlt;
    
  } catch (error) {
    console.error('[DALLE] Erreur génération image:', error);
    // Garder l'image par défaut locale
  }
  
  return { imageUrl, imageAlt };
}