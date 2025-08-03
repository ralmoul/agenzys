import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
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
          </header>
          
          <div 
            className="text-neutral-700 dark:text-neutral-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  )
}