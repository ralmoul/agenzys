import { NextRequest, NextResponse } from 'next/server';

interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  keywords: string[];
  author: string;
  published: boolean;
  slug: string;
  image?: string;
  imageAlt?: string;
}

// EXTRACTION ROBUSTE - CAPTURE TOUT LE CONTENU ET L'IMAGE
function extractFieldValue(rawJson: string, fieldName: string): string {
  console.log(`🔍 Extracting field: ${fieldName}`);
  const fieldPattern = new RegExp(`["']${fieldName}["']\\s*:\\s*["']`, 'i');
  const fieldMatch = rawJson.match(fieldPattern);
  
  if (!fieldMatch) {
    console.log(`❌ Field ${fieldName} NOT FOUND in JSON`);
    return '';
  }
  
  console.log(`✅ Field ${fieldName} FOUND, pattern:`, fieldMatch[0]);
  
  const startIndex = rawJson.indexOf(fieldMatch[0]) + fieldMatch[0].length;
  let value = '';
  let i = startIndex;
  let braceDepth = 0;
  let escapeNext = false;
  
  while (i < rawJson.length) {
    const char = rawJson[i];
    
    if (escapeNext) {
      value += char;
      escapeNext = false;
      i++;
      continue;
    }
    
    if (char === '\\') {
      escapeNext = true;
      i++;
      continue;
    }
    
    // Gérer les accolades dans le contenu
    if (char === '{') braceDepth++;
    if (char === '}') braceDepth--;
    
    // Si on trouve une quote, vérifier si c'est la fin du champ
    if (char === '"' || char === "'") {
      // Regarder ce qui suit pour voir si c'est vraiment la fin
      const afterQuote = rawJson.substring(i + 1, i + 10).trim();
      if ((afterQuote.startsWith(',') || afterQuote.startsWith('}') || afterQuote === '') && braceDepth === 0) {
        break; // C'est la fin du champ
      }
    }
    
    value += char;
    i++;
  }
  
  // Nettoyer les échappements
  return value
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\\\/g, '\\');
}

// Fonction pour parser le JSON de n8n (avec échappements doubles)
function parseN8nJson(jsonString: string): any {
  try {
    // D'abord, tenter un parsing normal
    return JSON.parse(jsonString);
  } catch (e) {
    try {
      // Si ça échoue, essayer de corriger les double-échappements
      const unescaped = jsonString
        .replace(/\\\\n/g, '\\n')
        .replace(/\\\\r/g, '\\r')
        .replace(/\\\\t/g, '\\t')
        .replace(/\\\\"/g, '\\"');
      
      return JSON.parse(unescaped);
    } catch (e2) {
      // En dernier recours, extraction manuelle
      console.log('🔧 Parsing manuel nécessaire');
      return null;
    }
  }
}

// Fonction pour commiter vers GitHub
async function commitToGitHub(blogPost: BlogPost) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || 'ralmoul/agenzys';
  const owner = repo.split('/')[0];
  const path = 'data/blog-posts.json';
  const branch = 'main';

  if (!token || token === 'your_github_token_here') {
    console.log('⚠️ GITHUB_TOKEN non configuré - simulation du commit');
    return { success: true, simulated: true };
  }

  try {
    // 1. Lire le fichier blog-posts.json actuel
    const getFileUrl = `https://api.github.com/repos/${repo}/contents/${path}`;
    const getResponse = await fetch(getFileUrl, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Next.js API'
      },
    });

    if (!getResponse.ok) {
      const errorText = await getResponse.text();
      console.error(`Failed to get file content: ${getResponse.status} - ${errorText}`);
      throw new Error(`Failed to get file content: ${getResponse.status} - ${errorText}`);
    }

    const fileContent = await getResponse.json();
    const sha = fileContent.sha;
    const existingContent = Buffer.from(fileContent.content, 'base64').toString('utf8');
    const existingPosts: BlogPost[] = JSON.parse(existingContent);

    // 2. Ajouter le nouvel article
    const updatedPosts = [...existingPosts, blogPost];
    const newContent = JSON.stringify(updatedPosts, null, 2);
    const encodedContent = Buffer.from(newContent).toString('base64');

    // 3. Commiter les changements
    const commitUrl = `https://api.github.com/repos/${repo}/contents/${path}`;
    const commitResponse = await fetch(commitUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Next.js API'
      },
      body: JSON.stringify({
        message: `📝 Nouvel article: ${blogPost.title}`,
        content: encodedContent,
        sha: sha,
        branch: branch,
      }),
    });

    if (!commitResponse.ok) {
      const errorText = await commitResponse.text();
      console.error(`Failed to commit to GitHub: ${commitResponse.status} - ${errorText}`);
      return { success: false, simulated: false, error: errorText };
    }

    const commitData = await commitResponse.json();
    console.log('✅ Commit GitHub réussi:', commitData.commit.html_url);
    return { success: true, simulated: false, commitUrl: commitData.commit.html_url };

  } catch (error) {
    console.error('❌ Erreur lors du commit GitHub:', error);
    return { success: false, simulated: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export async function POST(request: NextRequest) {
  // MODE DEBUG ULTRA - TOUJOURS RETOURNER SUCCESS AVEC TOUS LES DÉTAILS
  try {
    console.log('🚨 DEBUG MODE - API Blog reçue');
    
    const bodyText = await request.text();
    console.log('📄 BODY REÇU COMPLET:', bodyText);
    console.log('📏 Taille:', bodyText.length);
    
    // Essayer toutes les méthodes de parsing
    let results: any = {
      body_raw: bodyText,
      body_length: bodyText.length,
      parsing_attempts: {}
    };
    
    // Tentative 1: JSON direct
    try {
      const directParse = JSON.parse(bodyText);
      results.parsing_attempts.direct_json = { success: true, data: directParse };
    } catch (e) {
      results.parsing_attempts.direct_json = { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
    }
    
    // Tentative 2: JSON encapsulé n8n
    try {
      const tempParsed = JSON.parse(bodyText);
      if (tempParsed.json) {
        const n8nParse = JSON.parse(tempParsed.json);
        results.parsing_attempts.n8n_encapsulated = { success: true, data: n8nParse };
      }
    } catch (e) {
      results.parsing_attempts.n8n_encapsulated = { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
    }
    
    // Tentative 3: Extraction manuelle
    const title = extractFieldValue(bodyText, 'title');
    const excerpt = extractFieldValue(bodyText, 'excerpt');
    const content = extractFieldValue(bodyText, 'content');
    const category = extractFieldValue(bodyText, 'category');
    const image = extractFieldValue(bodyText, 'image');
    const imageAlt = extractFieldValue(bodyText, 'imageAlt');
    const keywordsStr = extractFieldValue(bodyText, 'keywords');
    
    results.parsing_attempts.manual_extraction = {
      success: true,
      data: {
        title: title,
        title_length: title.length,
        excerpt: excerpt,
        excerpt_length: excerpt.length,
        content_length: content.length,
        category: category,
        image: image,
        imageAlt: imageAlt,
        keywords: keywordsStr
      }
    };
    
    // TOUJOURS RETOURNER SUCCESS POUR DEBUG
    return NextResponse.json({
      success: true,
      message: '🚨 DEBUG MODE - Données reçues et analysées',
      debug_results: results
    });

  } catch (error) {
    console.error('❌ Erreur DEBUG:', error);
    
    return NextResponse.json({
      success: true, // MÊME EN CAS D'ERREUR POUR DEBUG
      message: '🚨 DEBUG MODE - Erreur capturée',
      error: error instanceof Error ? error.message : "Erreur inconnue"
    });
  }
}

export async function GET() {
  return NextResponse.json({
    message: '🚨 DEBUG MODE ACTIVÉ - API Blog Agenzys',
    status: 'debug_active',
    note: 'Cette API accepte tout et affiche tous les détails pour debugging'
  });
}