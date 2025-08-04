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
  const fieldPattern = new RegExp(`["']${fieldName}["']\\s*:\\s*["']`, 'i');
  const fieldMatch = rawJson.match(fieldPattern);
  
  if (!fieldMatch) return '';
  
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
  try {
    console.log('📝 API Blog - Nouveau POST reçu');
    
    let parsedBody;
    let rawBody = '';
    
    try {
      // 1. Essayer de lire le body en tant que JSON
      const bodyText = await request.text();
      rawBody = bodyText;
      console.log('📄 Body reçu (début):', bodyText.substring(0, 200) + '...');
      
      // 2. Si le body contient une propriété "json", c'est du n8n
      if (bodyText.includes('"json":')) {
        console.log('🔧 Format n8n détecté, extraction du JSON encapsulé');
        const tempParsed = JSON.parse(bodyText);
        if (tempParsed.json) {
          // C'est du JSON stringifié dans une propriété "json"
          parsedBody = parseN8nJson(tempParsed.json);
        } else {
          parsedBody = tempParsed;
        }
      } else {
        // 3. Sinon, parser directement
        parsedBody = parseN8nJson(bodyText);
      }
      
    } catch (parseError) {
      console.log('❌ Échec du parsing JSON classique, extraction manuelle');
      
      // Extraction manuelle des champs
      const title = extractFieldValue(rawBody, 'title');
      const excerpt = extractFieldValue(rawBody, 'excerpt');
      const content = extractFieldValue(rawBody, 'content');
      const category = extractFieldValue(rawBody, 'category');
      const image = extractFieldValue(rawBody, 'image');
      const imageAlt = extractFieldValue(rawBody, 'imageAlt');
      const keywordsStr = extractFieldValue(rawBody, 'keywords');
      
      console.log('🔧 Extraction manuelle:');
      console.log('- Title:', title.substring(0, 50) + '...');
      console.log('- Content length:', content.length);
      console.log('- Image:', image);
      
      parsedBody = {
        title,
        excerpt,
        content,
        category,
        image,
        imageAlt,
        keywords: keywordsStr
      };
    }

    console.log('✅ Données parsées avec succès');

    // Valider les données requises
    if (!parsedBody?.title || parsedBody.title.length < 5) {
      throw new Error('Le titre est requis et doit contenir au moins 5 caractères');
    }
    if (!parsedBody?.excerpt || parsedBody.excerpt.length < 20) {
      throw new Error('L\'extrait est requis et doit contenir au moins 20 caractères');
    }
    if (!parsedBody?.content || parsedBody.content.length < 100) {
      throw new Error('Le contenu est requis et doit contenir au moins 100 caractères');
    }
    if (!parsedBody?.category) {
      throw new Error('La catégorie est requise');
    }

    // Créer le slug
    const slug = parsedBody.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
      .replace(/[^a-z0-9\s-]/g, '') // Garder seulement lettres, chiffres, espaces, tirets
      .replace(/\s+/g, '-') // Remplacer espaces par tirets
      .replace(/-+/g, '-') // Éviter les tirets multiples
      .replace(/^-|-$/g, ''); // Supprimer tirets début/fin

    // Créer l'objet article
    const newPost: BlogPost = {
      title: parsedBody.title,
      excerpt: parsedBody.excerpt,
      content: parsedBody.content,
      date: new Date().toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      category: parsedBody.category,
      keywords: typeof parsedBody.keywords === 'string' 
        ? parsedBody.keywords.split(',').map((k: string) => k.trim())
        : Array.isArray(parsedBody.keywords) 
        ? parsedBody.keywords 
        : [],
      author: 'Agenzys',
      published: true,
      slug: slug,
      image: parsedBody.image || '',
      imageAlt: parsedBody.imageAlt || ''
    };

    console.log('📝 Article créé:', {
      title: newPost.title,
      slug: newPost.slug,
      content_length: newPost.content.length,
      has_image: !!newPost.image
    });

    // Publier sur GitHub
    const commitResult = await commitToGitHub(newPost);
    
    return NextResponse.json({
      success: true,
      message: 'Article publié avec succès sur le site',
      slug: newPost.slug,
      url: `https://agenzys.vercel.app/blog/${newPost.slug}`,
      article: {
        title: newPost.title,
        slug: newPost.slug,
        date: newPost.date,
        category: newPost.category,
        excerpt: newPost.excerpt.substring(0, 100) + (newPost.excerpt.length > 100 ? '...' : ''),
        content_length: newPost.content.length,
        has_image: !!newPost.image,
        image: newPost.image,
        imageAlt: newPost.imageAlt,
        keywords: newPost.keywords
      },
      github_commit: commitResult
    });

  } catch (error) {
    console.error('❌ Erreur API Blog:', error);
    
    return NextResponse.json({
      success: false,
      errors: [error instanceof Error ? error.message : "Erreur inconnue"]
    }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'API Blog Agenzys - Prêt pour recevoir vos articles !',
    endpoints: {
      POST: 'Créer un nouvel article de blog',
    },
    version: '2.0',
    status: 'active'
  });
}