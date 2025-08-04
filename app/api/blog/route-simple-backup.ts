import { NextRequest, NextResponse } from 'next/server'

// API SIMPLE - Accepte tout et simule la sauvegarde pour n8n

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

// Fonction pour générer un slug depuis le titre
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-') // Supprime les tirets multiples
    .trim()
}

// GET - Information sur l'API
export async function GET() {
  return NextResponse.json({
    success: true,
    status: 'API Blog Simple',
    message: 'API qui simule la sauvegarde pour tests n8n',
    timestamp: new Date().toISOString()
  })
}

// POST - Accepter un article et simuler la sauvegarde
export async function POST(request: NextRequest) {
  try {
    console.log('=== REQUÊTE N8N ===')
    console.log('Timestamp:', new Date().toISOString())
    
    // Lecture du body
    const body = await request.text()
    console.log('Body reçu:', body)
    
    let data
    try {
      data = JSON.parse(body)
      console.log('✅ JSON parsé - Clés:', Object.keys(data))
    } catch (parseError) {
      console.error('❌ Erreur parsing JSON:', parseError)
      return NextResponse.json(
        { success: false, error: 'JSON invalide' },
        { status: 400 }
      )
    }
    
    // Validation des données
    const validation = validateBlogPost(data)
    console.log('Validation:', validation)
    
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
    
    // Génération du slug
    const slug = generateSlug(data.title)
    
    // SIMULATION de la sauvegarde (pas de vraie sauvegarde fichier)
    console.log('🎯 Article simulé créé:', {
      title: data.title,
      slug: slug,
      category: data.category,
      has_image: !!data.image
    })
    
    // Réponse de succès
    const response = {
      success: true,
      message: 'Article créé avec succès (simulation)',
      slug: slug,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://agenzys.vercel.app'}/blog/${slug}`,
      article: {
        title: data.title,
        slug: slug,
        date: data.date || currentDate,
        category: data.category,
        keywords: data.keywords,
        image: data.image || null,
        author: data.author || 'Agenzys AI'
      },
      note: 'Sauvegarde simulée - données non persistées'
    }
    
    console.log('✅ Succès simulé pour n8n')
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('💥 Erreur POST:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur serveur', 
        details: error instanceof Error ? error.message : 'Erreur inconnue' 
      },
      { status: 500 }
    )
  }
}

// OPTIONS pour CORS
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
