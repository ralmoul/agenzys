import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Test pour voir où on peut écrire sur Vercel

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    let data = JSON.parse(body)
    
    const testResults = {
      timestamp: new Date().toISOString(),
      tests: []
    }
    
    // Test 1: Écriture dans /tmp (répertoire temporaire)
    try {
      const tmpFile = '/tmp/test-blog.json'
      fs.writeFileSync(tmpFile, JSON.stringify({ test: 'data' }, null, 2))
      const content = fs.readFileSync(tmpFile, 'utf8')
      testResults.tests.push({
        location: '/tmp',
        writable: true,
        note: 'Répertoire temporaire - fichiers supprimés après exécution'
      })
    } catch (e) {
      testResults.tests.push({
        location: '/tmp',
        writable: false,
        error: e.message
      })
    }
    
    // Test 2: Écriture dans data/ (répertoire du projet)
    try {
      const projectFile = path.join(process.cwd(), 'data', 'test-write.json')
      fs.writeFileSync(projectFile, JSON.stringify({ test: 'data' }, null, 2))
      testResults.tests.push({
        location: 'data/',
        writable: true,
        note: 'Répertoire projet - mais probablement en lecture seule sur Vercel'
      })
    } catch (e) {
      testResults.tests.push({
        location: 'data/',
        writable: false,
        error: e.message
      })
    }
    
    // Test 3: Variables d'environnement et processus
    testResults.environment = {
      platform: process.platform,
      cwd: process.cwd(),
      writableByNode: process.getuid ? `UID: ${process.getuid()}` : 'N/A',
      isVercel: !!process.env.VERCEL,
      isProduction: process.env.NODE_ENV === 'production'
    }
    
    return NextResponse.json({
      success: true,
      message: 'Tests d\'écriture terminés',
      results: testResults
    })
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      note: 'Erreur lors des tests d\'écriture'
    }, { status: 500 })
  }
}
