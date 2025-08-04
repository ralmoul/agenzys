import * as fs from 'fs'
import * as path from 'path'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  keywords: string[]
  author?: string
  published?: boolean
  image?: string
  imageAlt?: string}

// Fonction pour lire les articles depuis le fichier JSON
function loadPosts(): BlogPost[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'blog-posts.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const posts = JSON.parse(fileContents) as BlogPost[]
    return posts.filter(post => post.published !== false)
  } catch (error) {
    console.error('Erreur lors du chargement des articles:', error)
    return []
  }
}

// Fonction pour sauvegarder les articles dans le fichier JSON
export function savePosts(posts: BlogPost[]): boolean {
  try {
    const filePath = path.join(process.cwd(), 'data', 'blog-posts.json')
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des articles:', error)
    return false
  }
}

// Fonction pour ajouter un nouvel article
export function addPost(newPost: Omit<BlogPost, 'slug'>): { success: boolean; slug?: string; error?: string } {
  try {
    // Génération automatique du slug
    const slug = newPost.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
      .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
      .replace(/\s+/g, '-') // Remplace les espaces par des tirets
      .replace(/-+/g, '-') // Supprime les tirets multiples
      .trim()
    
    const posts = loadPosts()
    
    // Vérification que le slug n'existe pas déjà
    if (posts.find(post => post.slug === slug)) {
      return { success: false, error: 'Un article avec ce titre existe déjà' }
    }
    
    const fullPost: BlogPost = {
      ...newPost,
      slug,
      published: true,
      author: newPost.author || 'Agenzys'
    }
    
    posts.unshift(fullPost) // Ajoute en première position
    
    const saved = savePosts(posts)
    if (saved) {
      return { success: true, slug }
    } else {
      return { success: false, error: 'Erreur lors de la sauvegarde' }
    }
  } catch (error) {
    return { success: false, error: 'Erreur lors de l\'ajout de l\'article' }
  }
}

export function getAllPosts(): BlogPost[] {
  const posts = loadPosts()
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = loadPosts()
  return posts.find(post => post.slug === slug)
}

export function getLatestPosts(limit: number = 3): BlogPost[] {
  return getAllPosts().slice(0, limit)
}