import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4 text-neutral-800 dark:text-white">
          Blog Agenzys
        </h1>
        <p className="text-xl text-center text-neutral-600 dark:text-neutral-400 mb-12">
          Conseils, astuces et actualités pour optimiser votre agence immobilière
        </p>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold mb-3 text-neutral-800 dark:text-white hover:text-orange-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-500">
                  <span>{post.date}</span>
                  <span className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}