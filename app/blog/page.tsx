import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'

// MÉTADONNÉES SEO POUR LA PAGE BLOG
export const metadata: Metadata = {
  title: 'Blog Agenzys | Conseils & Astuces Automatisation Immobilier',
  description: 'Découvrez nos conseils d\'experts pour automatiser votre agence immobilière, optimiser vos leads et booster votre productivité. Articles, guides et actualités.',
  keywords: 'blog immobilier, automatisation immobilière, conseils agence immobilière, CRM immobilier, leads immobilier, marketing automation',
  
  openGraph: {
    title: 'Blog Agenzys - Automatisation Immobilière',
    description: 'Conseils, astuces et actualités pour optimiser votre agence immobilière avec l\'automatisation',
    url: 'https://agenzys.vercel.app/blog',
    siteName: 'Agenzys',
    images: [
      {
        url: 'https://agenzys.vercel.app/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Agenzys - Automatisation Immobilière',
      }
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Agenzys - Automatisation Immobilière',
    description: 'Conseils, astuces et actualités pour optimiser votre agence immobilière',
    images: ['https://agenzys.vercel.app/og-blog.jpg'],
    creator: '@agenzys',
  },
  
  alternates: {
    canonical: 'https://agenzys.vercel.app/blog',
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// DONNÉES STRUCTURÉES POUR LA PAGE BLOG
function generateBlogStructuredData(posts: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Agenzys',
    description: 'Conseils, astuces et actualités pour optimiser votre agence immobilière',
    url: 'https://agenzys.vercel.app/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Agenzys',
      url: 'https://agenzys.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://agenzys.vercel.app/logo.png'
      }
    },
    blogPost: posts.slice(0, 5).map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `https://agenzys.vercel.app/blog/${post.slug}`,
      datePublished: new Date(post.date).toISOString(),
      author: {
        '@type': 'Organization',
        name: 'Agenzys'
      }
    }))
  }
}

export default function BlogPage() {
  const posts = getAllPosts()
  const structuredData = generateBlogStructuredData(posts)

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
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-neutral-800 dark:text-white">
              Blog Agenzys
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Conseils, astuces et actualités pour optimiser votre agence immobilière avec l'automatisation
            </p>
          </header>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <article 
                key={post.slug} 
                className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  {/* Image d'article si disponible */}
                  {post.image && (
                    <div className="mb-4 -m-6 mt-0">
                      <img 
                        src={post.image} 
                        alt={post.imageAlt || post.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                        loading={index < 3 ? 'eager' : 'lazy'}
                      />
                    </div>
                  )}
                  
                  <div className={post.image ? 'p-6 pt-4' : ''}>
                    <h2 className="text-xl font-semibold mb-3 text-neutral-800 dark:text-white hover:text-orange-500 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-500 mt-auto">
                      <span>{post.date}</span>
                      <span className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 px-2 py-1 rounded text-xs">
                        {post.category}
                      </span>
                    </div>
                    
                    {/* Mots-clés */}
                    {post.keywords && post.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.keywords.slice(0, 3).map((keyword: string) => (
                          <span 
                            key={keyword}
                            className="text-xs bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 px-2 py-1 rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
          
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-600 dark:text-neutral-400">
                Aucun article publié pour le moment. Revenez bientôt !
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}