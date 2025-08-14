import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import axios from 'axios';

// Configuration OpenAI
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

// SUJETS AGENZYS
const ARTICLE_TOPICS = [
  {
    title: "Automatisation n8n : Comment Capturer et Qualifier vos Leads Immobiliers",
    excerpt: "Gagnez 2-4h par semaine grâce à l'automatisation intelligente de la capture et qualification de leads.",
    category: "Automatisation Leads",
    keywords: ["capture leads automatique", "qualification IA", "n8n immobilier"],
    type: "evergreen"
  },
  {
    title: "Traitement Automatisé des Dossiers de Location : OCR et Anti-Fraude IA",
    excerpt: "Économisez plusieurs jours par dossier grâce à l'analyse IA des documents locataires.",
    category: "Gestion Locative",
    keywords: ["OCR dossier location", "anti-fraude IA", "automatisation locative"],
    type: "evergreen"
  }
];

// PROMPT HTML DIRECT - Plus jamais de Markdown !
const ARTICLE_PROMPT = \`Tu es un expert rédacteur SEO immobilier. Génère un article HTML sur : {topic}

🚨 IMPORTANT: Génère UNIQUEMENT du HTML pur ! Pas de Markdown !

STRUCTURE HTML OBLIGATOIRE:
<h1>🎯 {topic}</h1>

<h2>📈 Introduction et Contexte 2025</h2>
<p>Paragraphe d'introduction bien espacé avec statistiques récentes...</p>
<p>Solution Agenzys avec <a href="https://agenzys.vercel.app" target="_blank" style="color: #3b82f6;">lien cliquable</a>.</p>

<h2>�� Pourquoi {topic} est Crucial</h2>
<p>Analyse détaillée avec stats 2024-2025...</p>

<h2>🔧 Solutions Agenzys n8n & IA</h2>
<p>Description des 5 automatisations :</p>
<ul>
<li>Capture & qualification leads automatique</li>
<li>Traitement OCR documents + anti-fraude</li>
<li>Synchronisation CRM-portails</li>
<li>Relances automatisées (-45% impayés)</li>
<li>Chatbot IA 24/7 WhatsApp</li>
</ul>

<h2>⚙️ Guide Pratique</h2>
<p>8 étapes concrètes avec timeline...</p>

<h2>🛠️ Outils Recommandés</h2>
<p>Stack tech + intégrations CRM...</p>

<h2>❌ Erreurs à Éviter</h2>
<p>7 erreurs communes + bonnes pratiques...</p>

<h2>✅ Conclusion</h2>
<p>Récapitulatif des bénéfices...</p>
<p><a href="https://agenzys.vercel.app" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">🚀 Demander une Démo</a></p>

RÈGLES:
- Mots-clés: {keywords}
- Chaque paragraphe = <p></p>
- Listes = <ul><li></li></ul>
- Liens stylés avec couleur #3b82f6
- ZERO Markdown ! QUE du HTML !\`;

async function generateArticleContent(topicData) {
  try {
    if (!openai) {
      throw new Error('OpenAI not configured');
    }
    
    const contentResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: ARTICLE_PROMPT
          .replace('{topic}', topicData.title)
          .replace('{keywords}', topicData.keywords.join(', '))
      }],
      temperature: 0.7,
      max_tokens: 6000,
    });

    // HTML DIRECT !
    const content = contentResponse.choices[0]?.message?.content || '';
    
    return {
      title: topicData.title,
      content: content,
      excerpt: topicData.excerpt,
      category: topicData.category,
      keywords: topicData.keywords,
      image: "/images/blog/default-immobilier.jpg",
      imageAlt: \`Guide \${topicData.title}\`,
      generation_method: "GPT-4 HTML Direct",
      type: topicData.type
    };

  } catch (error) {
    console.error('[AI] Erreur:', error);
    return {
      title: topicData.title,
      content: \`<h1>🎯 \${topicData.title}</h1><h2>📈 Introduction</h2><p>Article en cours de génération...</p>\`,
      excerpt: topicData.excerpt,
      category: topicData.category,
      keywords: topicData.keywords,
      image: "/images/blog/default-immobilier.jpg",
      imageAlt: \`Illustration \${topicData.title}\`,
      generation_method: "Fallback HTML",
      type: topicData.type
    };
  }
}

export async function POST(request) {
  try {
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== 'agenzys_admin_key_2025_secure') {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 });
    }

    const selectedTopic = ARTICLE_TOPICS[Math.floor(Math.random() * ARTICLE_TOPICS.length)];
    const article = await generateArticleContent(selectedTopic);

    return NextResponse.json({
      success: true,
      message: "Article généré avec HTML direct !",
      article: article,
      generation_method: "GPT-4 HTML Direct"
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    method: "HTML Direct",
    version: "4.0-html"
  });
}
