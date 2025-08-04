import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const baseUrl = 'https://agenzys.vercel.app'
  
  // URLs des articles de blog avec dates réelles
  const blogUrls = posts.map((post) => {
    // Convertir la date française en Date object
    const dateStr = post.date
    let lastModified: Date
    
    try {
      // Essayer de parser la date française
      const parts = dateStr.match(/(\d+)\s+(\w+)\s+(\d+)/)
      if (parts) {
        const day = parseInt(parts[1])
        const monthNames: { [key: string]: number } = {
          'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
          'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
        }
        const month = monthNames[parts[2].toLowerCase()] ?? 0
        const year = parseInt(parts[3])
        lastModified = new Date(year, month, day)
      } else {
        lastModified = new Date()
      }
    } catch {
      lastModified = new Date()
    }

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  })

  // Pages principales avec priorités optimisées
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const, // Mis à jour quotidiennement avec de nouveaux articles
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#features`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Trier les articles par date de publication (plus récents en premier)
  const sortedBlogUrls = blogUrls.sort((a, b) => 
    new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  )

  // Ajuster les priorités des articles les plus récents
  const enhancedBlogUrls = sortedBlogUrls.map((url, index) => {
    if (index < 3) {
      // Les 3 articles les plus récents ont une priorité plus élevée
      return { ...url, priority: 0.9 }
    }
    return url
  })

  return [
    ...staticUrls,
    ...enhancedBlogUrls
  ]
}