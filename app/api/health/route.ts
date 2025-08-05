import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      endpoints: {
        'GET /api/health': 'Vérifier l\'état de l\'API',
        'GET /api/ai': 'Services IA disponibles',
        'GET /api/seo': 'Services SEO disponibles'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'error', error: 'Erreur du serveur' },
      { status: 500 }
    )
  }
}