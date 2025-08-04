import { NextRequest, NextResponse } from 'next/server'

// VERSION ULTRA DEBUG - ACCEPTE TOUT et log tout

export async function POST(request: NextRequest) {
  try {
    console.log('\n🚀 === ULTRA DEBUG N8N ===')
    
    // Headers complets
    const headers = Object.fromEntries(request.headers.entries())
    console.log('HEADERS:', JSON.stringify(headers, null, 2))
    
    // Body complet
    const body = await request.text()
    console.log('BODY RAW:', body)
    console.log('BODY LENGTH:', body.length)
    
    // Tentative de parsing
    let parsedData: any = null
    let parseMethod = 'none'
    
    // Essai 1: JSON
    try {
      parsedData = JSON.parse(body)
      parseMethod = 'json'
      console.log('✅ JSON PARSE SUCCESS')
    } catch (e) {
      console.log('❌ JSON parse failed')
      
      // Essai 2: URLSearchParams (form-data)
      try {
        const params = new URLSearchParams(body)
        parsedData = Object.fromEntries(params.entries())
        parseMethod = 'urlencoded'
        console.log('✅ URL ENCODED PARSE SUCCESS')
      } catch (e2) {
        console.log('❌ URL encoded parse failed')
        
        // Essai 3: Multipart (si possible)
        if (headers['content-type']?.includes('multipart')) {
          parseMethod = 'multipart'
          console.log('⚠️ MULTIPART detected but not parsed')
          parsedData = { raw_body: body }
        } else {
          parseMethod = 'raw'
          parsedData = { raw_body: body }
          console.log('⚠️ Using RAW body')
        }
      }
    }
    
    console.log('PARSE METHOD:', parseMethod)
    console.log('PARSED DATA:', JSON.stringify(parsedData, null, 2))
    
    // Retourner TOUTES les infos pour debug
    return NextResponse.json({
      success: true,
      debug_info: {
        message: 'API Ultra Debug - Tout est accepté',
        timestamp: new Date().toISOString(),
        parse_method: parseMethod,
        headers: headers,
        body_raw: body,
        body_parsed: parsedData,
        content_type: headers['content-type'],
        user_agent: headers['user-agent'],
        body_length: body.length
      }
    })
    
  } catch (error) {
    console.error('ERROR:', error)
    return NextResponse.json({
      success: false,
      error: 'Ultra debug error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Ultra Debug API',
    message: 'Cette API accepte tout et log tout pour diagnostiquer n8n',
    timestamp: new Date().toISOString()
  })
}
