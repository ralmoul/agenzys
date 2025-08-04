import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test de lecture des articles
    const { getAllPosts } = await import('@/lib/blog')
    const posts = getAllPosts()
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      blog: {
        articlesCount: posts.length,
        lastArticle: posts[0]?.title || 'Aucun article'
      },
      endpoints: {
        'GET /api/blog': 'Lister les articles',
        'POST /api/blog': 'Créer un article (nécessite signature)',
        'GET /api/health': 'Vérifier l\'état de l\'API'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'error', error: 'Erreur lors du chargement des articles' },
      { status: 500 }
    )
  }
}