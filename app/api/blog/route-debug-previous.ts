import { NextRequest, NextResponse } from 'next/server'
import { addPost, BlogPost } from '@/lib/blog'

// API DEBUG pour diagnostiquer le problème n8n

// Fonction pour valider les données d'un article
function validateBlogPost(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  console.log('=== VALIDATION DÉTAILLÉE ===')
  console.log('Type de data:', typeof data)
  console.log('Data reçue:', JSON.stringify(data, null, 2))
  
  if (!data.title || typeof data.title !== 'string' || data.title.length < 5) {
    errors.push('Le titre est requis et doit contenir au moins 5 caractères')
    console.log('❌ Titre invalide:', { value: data.title, type: typeof data.title, length: data.title?.length })
  } else {
    console.log('✅ Titre valide:', data.title.length + ' caractères')
  }
  
  if (!data.excerpt || typeof data.excerpt !== 'string' || data.excerpt.length < 20) {
    errors.push('L\'extrait est requis et doit contenir au moins 20 caractères')
    console.log('❌ Excerpt invalide:', { value: data.excerpt?.substring(0, 50), type: typeof data.excerpt, length: data.excerpt?.length })
  } else {
    console.log('✅ Excerpt valide:', data.excerpt.length + ' caractères')
  }
  
  if (!data.content || typeof data.content !== 'string' || data.content.length < 100) {
    errors.push('Le contenu est requis et doit contenir au moins 100 caractères')
    console.log('❌ Content invalide:', { value: data.content?.substring(0, 50), type: typeof data.content, length: data.content?.length })
  } else {
    console.log('✅ Content valide:', data.content.length + ' caractères')
  }
  
  if (!data.category || typeof data.category !== 'string') {
    errors.push('La catégorie est requise')
    console.log('❌ Category invalide:', { value: data.category, type: typeof data.category })
  } else {
    console.log('✅ Category valide:', data.category)
  }
  
  if (!data.keywords || !Array.isArray(data.keywords) || data.keywords.length === 0) {
    errors.push('Au moins un mot-clé est requis')
    console.log('❌ Keywords invalides:', { value: data.keywords, type: typeof data.keywords, isArray: Array.isArray(data.keywords) })
  } else {
    console.log('✅ Keywords valides:', data.keywords.length + ' mots-clés')
  }
  
  return { valid: errors.length === 0, errors }
}

// POST - Version debug pour n8n
export async function POST(request: NextRequest) {
  try {
    console.log('\n=== 🚀 NOUVELLE REQUÊTE BLOG DEBUG N8N ===')
    console.log('Timestamp:', new Date().toISOString())
    console.log('URL:', request.url)
    console.log('Method:', request.method)
    
    // Log complet des headers
    const headers = Object.fromEntries(request.headers.entries())
    console.log('\n=== 📋 HEADERS ===')
    Object.entries(headers).forEach(([key, value]) => {
      console.log(`${key}: ${value}`)
    })
    
    // Lecture du body avec détails
    const body = await request.text()
    console.log('\n=== 📄 BODY ===')
    console.log('Longueur:', body.length)
    console.log('Body complet:', body)
    console.log('Premiers 300 caractères:', body.substring(0, 300))
    
    let data: any = null
    
    // Essai de parsing multiple
    console.log('\n=== 🔧 PARSING ===')
    try {
      data = JSON.parse(body)
      console.log('✅ JSON.parse() réussi')
      console.log('Type:', typeof data)
      console.log('Clés trouvées:', Object.keys(data))
      console.log('Données complètes:', JSON.stringify(data, null, 2))
    } catch (parseError) {
      console.log('❌ JSON.parse() échoué:', parseError instanceof Error ? parseError.message : String(parseError))
      
      // Essai form-data
      try {
        if (headers['content-type']?.includes('application/x-www-form-urlencoded')) {
          console.log('Tentative parsing form-data...')
          const urlParams = new URLSearchParams(body)
          data = Object.fromEntries(urlParams.entries())
          console.log('✅ Form-data parsé:', data)
        } else {
          console.log('Content-Type non supporté pour parsing alternatif')
          throw parseError
        }
      } catch (altError) {
        console.log('❌ Parsing alternatif échoué:', altError instanceof Error ? altError.message : String(altError))
        return NextResponse.json({
          success: false,
          error: 'Erreur de parsing',
          debug: {
            original_error: parseError instanceof Error ? parseError.message : String(parseError),
            content_type: headers['content-type'],
            body_preview: body.substring(0, 200),
            body_length: body.length,
            user_agent: headers['user-agent']
          }
        }, { status: 400 })
      }
    }
    
    // Si pas de données, c'est un problème
    if (!data) {
      console.log('❌ Aucune donnée après parsing')
      return NextResponse.json({
        success: false,
        error: 'Aucune donnée reçue',
        debug: { body, headers }
      }, { status: 400 })
    }
    
    // Validation avec logs détaillés
    const validation = validateBlogPost(data)
    console.log('\n=== ✅ RÉSULTAT VALIDATION ===')
    console.log('Valide:', validation.valid)
    if (!validation.valid) {
      console.log('Erreurs:', validation.errors)
      return NextResponse.json({
        success: false,
        errors: validation.errors,
        debug: {
          received_data: data,
          headers: headers,
          body_preview: body.substring(0, 200)
        }
      }, { status: 400 })
    }
    
    // Si tout est OK, créer l'article
    console.log('\n=== 🎯 CRÉATION ARTICLE ===')
    const currentDate = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    
    const newPost: Omit<BlogPost, 'slug'> = {
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      date: data.date || currentDate,
      category: data.category,
      keywords: Array.isArray(data.keywords) ? data.keywords : [data.keywords],
      author: data.author || 'Agenzys AI'
    }
    
    // Ajouter les champs image si fournis
    if (data.image) {
      (newPost as any).image = data.image
    }
    if (data.imageAlt) {
      (newPost as any).imageAlt = data.imageAlt
    }
    
    console.log('Article à créer:', JSON.stringify(newPost, null, 2))
    
    const result = addPost(newPost)
    console.log('Résultat création:', result)
    
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
        },
        debug_info: {
          user_agent: headers['user-agent'],
          content_type: headers['content-type'],
          body_length: body.length
        }
      }
      
      console.log('🎉 SUCCÈS!')
      return NextResponse.json(response)
    } else {
      console.log('❌ Échec création:', result.error)
      return NextResponse.json({
        success: false,
        error: result.error,
        debug: { newPost, result }
      }, { status: 400 })
    }
    
  } catch (error) {
    console.error('💥 ERREUR FATALE:', error)
    return NextResponse.json({
      success: false,
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
      stack: error instanceof Error ? error.stack : null
    }, { status: 500 })
  }
}

// GET pour info
export async function GET() {
  return NextResponse.json({
    status: 'API Debug N8N',
    message: 'Cette version inclut des logs détaillés pour diagnostiquer n8n',
    timestamp: new Date().toISOString()
  })
}

// OPTIONS pour CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-requested-with',
    },
  })
}
