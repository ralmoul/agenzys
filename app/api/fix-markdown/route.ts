import { NextRequest, NextResponse } from 'next/server';
import { marked } from 'marked';
import fs from 'fs';
import path from 'path';

// API UTILITAIRE - Convertir Markdown en HTML pour les anciens articles
export async function POST(request: NextRequest) {
  try {
    const { action = 'fix-current' } = await request.json().catch(() => ({}));
    
    console.log('[FIX-MD] Démarrage conversion Markdown → HTML');
    
    // Lire le fichier blog-posts.json
    const blogPath = path.join(process.cwd(), 'data', 'blog-posts.json');
    const blogData = JSON.parse(fs.readFileSync(blogPath, 'utf8'));
    
    let fixedCount = 0;
    
    // Parcourir tous les articles
    for (let i = 0; i < blogData.length; i++) {
      const post = blogData[i];
      
      // Vérifier si le contenu est en Markdown (commence par # ou contient \n\n)
      if (post.content && (post.content.startsWith('#') || post.content.includes('\n\n'))) {
        console.log(`[FIX-MD] Conversion article: "${post.title}"`);
        
        // Convertir Markdown en HTML
        const htmlContent = await marked(post.content);
        
        // Mettre à jour le contenu
        blogData[i].content = htmlContent;
        fixedCount++;
        
        console.log(`[FIX-MD] ✅ Article converti: ${post.title}`);
      }
    }
    
    if (fixedCount > 0) {
      // Sauvegarder le fichier mis à jour
      fs.writeFileSync(blogPath, JSON.stringify(blogData, null, 2));
      console.log(`[FIX-MD] 🎉 ${fixedCount} articles convertis et sauvegardés`);
    }
    
    return NextResponse.json({
      success: true,
      message: `${fixedCount} articles convertis de Markdown vers HTML`,
      articles_fixed: fixedCount,
      total_articles: blogData.length
    });
    
  } catch (error) {
    console.error('[FIX-MD] Erreur:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

// GET pour vérifier le statut
export async function GET() {
  try {
    const blogPath = path.join(process.cwd(), 'data', 'blog-posts.json');
    const blogData = JSON.parse(fs.readFileSync(blogPath, 'utf8'));
    
    let markdownCount = 0;
    let htmlCount = 0;
    
    blogData.forEach((post: any) => {
      if (post.content) {
        if (post.content.startsWith('#') || post.content.includes('\n\n')) {
          markdownCount++;
        } else if (post.content.includes('<h1>') || post.content.includes('<h2>')) {
          htmlCount++;
        }
      }
    });
    
    return NextResponse.json({
      total_articles: blogData.length,
      markdown_articles: markdownCount,
      html_articles: htmlCount,
      needs_conversion: markdownCount > 0
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur lecture'
    }, { status: 500 });
  }
}