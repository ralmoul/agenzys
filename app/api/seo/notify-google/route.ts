import { NextRequest, NextResponse } from 'next/server';

// API pour notifier Google Search Console de nouveaux contenus
export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json();
    
    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json(
        { success: false, error: 'URLs array required' },
        { status: 400 }
      );
    }

    const results = [];
    
    // Notifier Google pour chaque URL
    for (const url of urls) {
      try {
        // Google Indexing API (nécessite une configuration OAuth2)
        // Pour l'instant, nous simulons la notification
        console.log(`🔔 Notification Google pour: ${url}`);
        
        // Ping Google directement via HTTP (méthode simple)
        const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent('https://agenzys.vercel.app/sitemap.xml')}`;
        
        const response = await fetch(pingUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'Agenzys SEO Bot'
          }
        });
        
        results.push({
          url,
          status: response.ok ? 'success' : 'error',
          statusCode: response.status
        });
        
      } catch (error) {
        console.error(`❌ Erreur notification Google pour ${url}:`, error);
        results.push({
          url,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Notifications Google envoyées',
      results
    });

  } catch (error) {
    console.error('❌ Erreur API SEO:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne' },
      { status: 500 }
    );
  }
}

// Fonction utilitaire pour notifier automatiquement après publication d'article
export async function notifyGoogleNewContent(articleUrl: string) {
  try {
    const response = await fetch('https://agenzys.vercel.app/api/seo/notify-google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: [
          articleUrl,
          'https://agenzys.vercel.app/blog',
          'https://agenzys.vercel.app/sitemap.xml'
        ]
      })
    });
    
    const result = await response.json();
    console.log('✅ Google notifié:', result);
    return result;
    
  } catch (error) {
    console.error('❌ Erreur notification Google:', error);
    return { success: false, error };
  }
}