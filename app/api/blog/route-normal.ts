import { NextRequest, NextResponse } from 'next/server'
import { addPost, BlogPost } from '@/lib/blog'

// SIGNATURE HMAC SUPPRIMÉE - Plus simple pour l'automatisation

// Fonction pour valider les données d'un article
function validateBlogPost(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!data.title || typeof data.title !== 'string' || data.title.length < 5) {
    errors.push('Le titre est requis et doit contenir au moins 5 caractères')
  }
  
  if (!data.excerpt || typeof data.excerpt !== 'string' || data.excerpt.length < 20) {
    errors.push('L\'extrait est requis et doit contenir au moins 20 caractères')
  }
  
  if (!data.content || typeof data.content !== 'string' || data.content.length < 100) {
    errors.push('Le contenu est requis et doit contenir au moins 100 caractères')
  }
  
  if (!data.category || typeof data.category !== 'string') {
    errors.push('La catégorie est requise')
  }
  
  if (!data.keywords || !Array.isArray(data.keywords) || data.keywords.length === 0) {
    errors.push('Au moins un mot-clé est requis')
  }
  
  // Validation optionnelle de l'image
  if (data.image && typeof data.image !== 'string') {
    errors.push('L\'URL de l\'image doit être une chaîne de caractères')
  }
  
  if (data.imageAlt && typeof data.imageAlt !== 'string') {
    errors.push('Le texte alternatif de l\'image doit être une chaîne de caractères')
  }
  
  return { valid: errors.length === 0, errors }
}

// GET - Récupérer les articles (pour debug)
export async function GET() {
  try {
    const { getAllPosts } = await import('@/lib/blog')
    const posts = getAllPosts()
    
    return NextResponse.json({
      success: true,
      count: posts.length,
      posts: posts.slice(0, 5) // Limite à 5 pour éviter une réponse trop lourde
    })
  } catch (error) {
    console.error('Erreur GET /api/blog:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// POST - Ajouter un nouvel article (SANS signature HMAC)
export async function POST(request: NextRequest) {
  try {
    console.log('=== NOUVELLE REQUÊTE BLOG ===')
    console.log('Timestamp:', new Date().toISOString())
    
    // Lecture du body
    const body = await request.text()
    console.log('Body reçu (200 premiers caractères):', body.substring(0, 200))
    
    let data
    
    try {
      data = JSON.parse(body)
      console.log('JSON parsé avec succès. Clés:', Object.keys(data))
    } catch (parseError) {
      console.error('Erreur parsing JSON:', parseError)
      return NextResponse.json(
        { success: false, error: 'JSON invalide' },
        { status: 400 }
      )
    }
    
    // Validation des données (SANS vérification de signature)
    const validation = validateBlogPost(data)
    console.log('Validation des données:', validation)
    
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      )
    }
    
    // Formatage de la date
    const currentDate = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    
    // Création de l'article
    const newPost: Omit<BlogPost, 'slug'> = {
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      date: data.date || currentDate,
      category: data.category,
      keywords: data.keywords,
      author: data.author || 'Agenzys AI'
    }
    
    // Ajouter les champs image si fournis
    if (data.image) {
      (newPost as any).image = data.image
    }
    if (data.imageAlt) {
      (newPost as any).imageAlt = data.imageAlt
    }
    
    console.log('Tentative de création de l\'article:', {
      title: newPost.title,
      excerpt_length: newPost.excerpt.length,
      content_length: newPost.content.length,
      category: newPost.category,
      keywords_count: newPost.keywords.length,
      has_image: !!data.image
    })
    
    // Ajout de l'article
    const result = addPost(newPost)
    console.log('Résultat de l\'ajout:', result)
    
    if (result.success) {
      const response = {
        success: true,
        message: 'Article créé avec succès',
        slug: result.slug,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://agenzys.vercel.app'}/blog/${result.slug}`,
        article: {
          title: newPost.title,
          slug: result.slug,
          date: newPost.date,
          image: data.image || null
        }
      }
      
      console.log('✅ Article créé avec succès:', result.slug)
      return NextResponse.json(response)
    } else {
      console.log('❌ Échec création article:', result.error)
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }
    
  } catch (error) {
    console.error('Erreur POST /api/blog:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
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
  })
}
