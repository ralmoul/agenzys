import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Configuration Perplexity UNIQUEMENT
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || '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';

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

const PERPLEXITY_PROMPT = \`Tu es un expert rédacteur SEO immobilier. Rédige un article sur : {topic}

STRUCTURE (2000 mots):
1. <h1>🎯 {title}</h1>
2. <h2>�� Introduction</h2> (300 mots)
3. <h2>📊 Enjeux Agences</h2> (500 mots)
4. <h2>🔧 Solutions Agenzys</h2> (600 mots)
5. <h2>⚙️ Guide Pratique</h2> (400 mots)
6. <h2>✅ Conclusion</h2> (200 mots)

MOTS-CLÉS: {keywords}
LIENS: <a href="https://agenzys.vercel.app" target="_blank" style="color: #3b82f6;">Agenzys</a>
FORMAT: HTML direct avec <h1>, <h2>, <p>, <ul><li>\`;

async function generateWithPerplexity(topic: any) {
  try {
    console.log(\`[PERPLEXITY] Génération: "\${topic.title}"\`);

    const response = await axios.post('https://api.perplexity.ai/chat/completions', {
      model: 'llama-3.1-sonar-huge-128k-online',
      messages: [{
        role: 'user',
        content: PERPLEXITY_PROMPT
          .replace('{topic}', topic.title)
          .replace('{title}', topic.title)
          .replace('{keywords}', topic.keywords.join(', '))
      }],
      temperature: 0.7,
      max_tokens: 4000,
    }, {
      headers: {
        'Authorization': \`Bearer \${PERPLEXITY_API_KEY}\`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    const content = response.data.choices[0]?.message?.content || '';
    
    if (!content || content.length < 500) {
      throw new Error('Contenu trop court');
    }

    return {
      title: topic.title,
      content: content,
      excerpt: topic.excerpt,
      category: topic.category,
      keywords: topic.keywords,
      image: "/images/blog/default-immobilier.jpg",
      imageAlt: \`Guide \${topic.title}\`,
      generation_method: "Perplexity Sonar",
      type: topic.type
    };

  } catch (error) {
    console.error('[PERPLEXITY] Erreur:', error);
    throw new Error(\`Erreur Perplexity: \${error.message}\`);
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('[API] Démarrage génération...');

    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== 'agenzys_admin_key_2025_secure') {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 });
    }

    const selectedTopic = ARTICLE_TOPICS[Math.floor(Math.random() * ARTICLE_TOPICS.length)];
    console.log(\`[API] Sujet: \${selectedTopic.title}\`);

    const article = await generateWithPerplexity(selectedTopic);

    return NextResponse.json({
      success: true,
      message: "Article généré avec Perplexity !",
      article: article,
      generation_method: "Perplexity Only"
    });

  } catch (error) {
    console.error('[API] Erreur:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    method: "Perplexity Only",
    version: "3.0-simple"
  });
}
