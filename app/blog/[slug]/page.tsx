import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

// MÉTADONNÉES SEO AUTOMATIQUES
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Article non trouvé | Agenzys',
      description: 'Cet article n\'existe pas.'
    }
  }

  // URL canonique
  const url = `https://agenzys.vercel.app/blog/${post.slug}`
  
  // Image par défaut si pas d'image spécifique
  const imageUrl = post.image || 'https://agenzys.vercel.app/og-image.jpg'

  return {
    title: `${post.title} | Agenzys`,
    description: post.excerpt,
    keywords: post.keywords?.join(', ') || 'automatisation immobilier, CRM, leads',
    authors: [{ name: post.author || 'Agenzys' }],
    creator: 'Agenzys',
    publisher: 'Agenzys',
    
    // URLs canoniques
    alternates: {
      canonical: url,
    },
    
    // Open Graph pour réseaux sociaux
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: url,
      siteName: 'Agenzys',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        }
      ],
      locale: 'fr_FR',
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author || 'Agenzys'],
      section: post.category,
      tags: post.keywords,
    },
    
    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
      creator: '@agenzys',
      site: '@agenzys',
    },
    
    // Données structurées pour robots.txt
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// DONNÉES STRUCTURÉES JSON-LD
function generateStructuredData(post: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image || 'https://agenzys.vercel.app/og-image.jpg',
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: post.author || 'Agenzys',
      url: 'https://agenzys.vercel.app'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Agenzys',
      url: 'https://agenzys.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://agenzys.vercel.app/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://agenzys.vercel.app/blog/${post.slug}`
    },
    articleSection: post.category,
    keywords: post.keywords?.join(', ') || 'automatisation immobilier, CRM, leads',
    url: `https://agenzys.vercel.app/blog/${post.slug}`
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const structuredData = generateStructuredData(post)

  return (
    <>
      {/* Données structurées JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      <div className="min-h-screen bg-white dark:bg-neutral-950 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au blog
          </Link>
          
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                <span>{post.date}</span>
                <span className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 px-2 py-1 rounded">
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-neutral-800 dark:text-white mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-400">
                {post.excerpt}
              </p>
              
              {/* Image de l'article si disponible */}
              {post.image && (
                <div className="my-8 relative w-full h-64">
                  <Image 
                    src={post.image} 
                    alt={post.imageAlt || post.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
            </header>
            
            <div 
              className="text-neutral-700 dark:text-neutral-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Mots-clés */}
            {post.keywords && post.keywords.length > 0 && (
              <footer className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 mr-2">Mots-clés:</span>
                  {post.keywords.map((keyword: string) => (
                    <span 
                      key={keyword}
                      className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-1 rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </footer>
            )}
          </article>
        </div>
      </div>
    </>
  )
}