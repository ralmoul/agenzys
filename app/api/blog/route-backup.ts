import { NextRequest, NextResponse } from 'next/server'
import { addPost, BlogPost } from '@/lib/blog'
import crypto from 'crypto'

// Clé secrète pour sécuriser l'API (à définir dans vos variables d'environnement)
const API_SECRET = process.env.BLOG_API_SECRET || 'your-secret-key-here'

// Fonction pour valider la signature (sécurité)
function validateSignature(body: string, signature: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', API_SECRET)
    .update(body)
    .digest('hex')
  
  return signature === `sha256=${expectedSignature}`
}

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

// POST - Ajouter un nouvel article (pour n8n)
export async function POST(request: NextRequest) {
  try {
    // Lecture du body
    const body = await request.text()
    let data
    
    try {
      data = JSON.parse(body)
    } catch {
      return NextResponse.json(
        { success: false, error: 'JSON invalide' },
        { status: 400 }
      )
    }
    
    // Validation de la signature (sécurité)
    const signature = request.headers.get('x-signature')
    if (!signature || !validateSignature(body, signature)) {
      return NextResponse.json(
        { success: false, error: 'Signature invalide' },
        { status: 401 }
      )
    }
    
    // Validation des données
    const validation = validateBlogPost(data)
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
    
    // Ajout de l'article
    const result = addPost(newPost)
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Article créé avec succès',
        slug: result.slug,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://agenzys.vercel.app'}/blog/${result.slug}`
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }
    
  } catch (error) {
    console.error('Erreur POST /api/blog:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
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
      'Access-Control-Allow-Headers': 'Content-Type, x-signature',
    },
  })
}