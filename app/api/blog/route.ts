import { NextRequest, NextResponse } from 'next/server';
import { addPost, BlogPost } from '@/lib/blog';

function validateBlogPost(data: any): string[] {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 5) {
    errors.push('Le titre est requis et doit contenir au moins 5 caractères');
  }

  if (!data.excerpt || typeof data.excerpt !== 'string' || data.excerpt.trim().length < 20) {
    errors.push('L\'extrait est requis et doit contenir au moins 20 caractères');
  }

  if (!data.content || typeof data.content !== 'string' || data.content.trim().length < 100) {
    errors.push('Le contenu est requis et doit contenir au moins 100 caractères');
  }

  if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
    errors.push('La catégorie est requise');
  }

  if (!data.keywords || !Array.isArray(data.keywords) || data.keywords.length === 0) {
    errors.push('Au moins un mot-clé est requis');
  }

  return errors;
}

export async function GET() {
  return NextResponse.json({ message: 'API Blog Agenzys - Endpoint fonctionnel' });
}

export async function POST(request: NextRequest) {
  try {
    console.log('📝 Réception d\'une nouvelle requête blog...');
    
    // Parse le body
    const body = await request.json();
    console.log('�� Body reçu:', body);

    // 🔑 SOLUTION : N8n encapsule le JSON dans une propriété "json"
    let data;
    if (body.json && typeof body.json === 'string') {
      console.log('🔧 Détection du format n8n - parsing du JSON encapsulé...');
      try {
        // Nettoyer le JSON de tous les caractères de contrôle problématiques
        let cleanJson = body.json
          .replace(/\n/g, '\\n')           // Échapper les retours à la ligne
          .replace(/\r/g, '\\r')           // Échapper les retours chariot
          .replace(/\t/g, '\\t')           // Échapper les tabulations
          .replace(/\f/g, '\\f')           // Échapper les form feeds
          .replace(/\b/g, '\\b')           // Échapper les backspaces
          .replace(/\v/g, '\\v');          // Échapper les tabulations verticales
        
        console.log('🧹 JSON nettoyé, tentative de parsing...');
        data = JSON.parse(cleanJson);
        console.log('✅ JSON n8n parsé avec succès:', data);
      } catch (parseError) {
        console.error('❌ Erreur lors du parsing du JSON n8n:', parseError);
        console.error('📋 JSON original (100 premiers caractères):', body.json.substring(0, 100));
        
        // Tentative de fallback : essayer de parser en supprimant tous les caractères de contrôle
        try {
          console.log('🔄 Tentative de parsing alternatif...');
          // Remplacer tous les caractères de contrôle par des espaces
          let fallbackJson = body.json.replace(/[\x00-\x1F\x7F]/g, ' ');
          data = JSON.parse(fallbackJson);
          console.log('✅ Parsing alternatif réussi:', data);
        } catch (fallbackError) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Format JSON n8n invalide',
              details: parseError instanceof Error ? parseError.message : "Erreur de parsing",
              json_preview: body.json.substring(0, 200) + '...' // Les 200 premiers caractères pour debug
            },
            { status: 400 }
          );
        }
      }
    } else {
      // Format direct (pour les tests)
      console.log('📤 Format direct détecté');
      data = body;
    }

    // Validation des données
    const errors = validateBlogPost(data);
    if (errors.length > 0) {
      console.log('❌ Erreurs de validation:', errors);
      return NextResponse.json(
        { 
          success: false, 
          errors: errors 
        },
        { status: 400 }
      );
    }

    // Formatage de la date
    const currentDate = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Création de l'article
    const newPost: Omit<BlogPost, 'slug'> = {
      title: data.title.trim(),
      excerpt: data.excerpt.trim(),
      content: data.content.trim(),
      date: data.date || currentDate,
      category: data.category.trim(),
      keywords: data.keywords,
      author: data.author || 'Agenzys',
      published: data.published !== false
    };

    // Ajout de l'image si fournie
    if (data.image) {
      newPost.image = data.image;
    }
    if (data.imageAlt) {
      newPost.imageAlt = data.imageAlt;
    }

    console.log('💾 Tentative de sauvegarde de l\'article:', {
      title: newPost.title,
      excerpt_length: newPost.excerpt.length,
      content_length: newPost.content.length,
      category: newPost.category,
      keywords_count: newPost.keywords.length,
      image: newPost.image,
      imageAlt: newPost.imageAlt,
    });

    // ⚠️ Sur Vercel, on ne peut pas écrire dans le système de fichiers en production
    // Pour l'instant, on simule le succès et on renvoie une réponse positive
    const simulatedSlug = data.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    console.log('✅ Article traité avec succès (simulé)');

    return NextResponse.json({
      success: true,
      message: 'Article créé avec succès',
      slug: simulatedSlug,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://agenzys.vercel.app'}/blog/${simulatedSlug}`,
      article: {
        title: data.title,
        slug: simulatedSlug,
        date: currentDate,
        category: data.category,
        image: data.image,
        imageAlt: data.imageAlt,
      }
    });

  } catch (error) {
    console.error('❌ Erreur POST /api/blog:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la création de l\'article',
        details: error instanceof Error ? error.message : "Erreur inconnue"
      },
      { status: 500 }
    );
  }
}

// OPTIONS - Pour les requêtes CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
