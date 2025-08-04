#!/usr/bin/env node

/**
 * Script de vérification SEO automatique
 * Vérifie que tous les articles ont les bonnes métadonnées
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification SEO automatique...\n');

// Lire les articles
const blogDataPath = path.join(process.cwd(), 'data', 'blog-posts.json');
let articles = [];

try {
  const data = fs.readFileSync(blogDataPath, 'utf8');
  articles = JSON.parse(data);
} catch (error) {
  console.error('❌ Erreur lecture blog-posts.json:', error.message);
  process.exit(1);
}

console.log(`📊 ${articles.length} articles trouvés\n`);

let errors = 0;
let warnings = 0;

articles.forEach((article, index) => {
  console.log(`📝 Article ${index + 1}: ${article.title}`);
  
  // Vérifications SEO
  const checks = [
    {
      name: 'Titre',
      check: article.title && article.title.length >= 10 && article.title.length <= 60,
      current: article.title?.length || 0,
      optimal: '10-60 caractères'
    },
    {
      name: 'Excerpt',
      check: article.excerpt && article.excerpt.length >= 50 && article.excerpt.length <= 160,
      current: article.excerpt?.length || 0,
      optimal: '50-160 caractères'
    },
    {
      name: 'Contenu',
      check: article.content && article.content.length >= 300,
      current: article.content?.length || 0,
      optimal: '300+ caractères'
    },
    {
      name: 'Catégorie',
      check: article.category && article.category.length > 0,
      current: article.category ? '✓' : '✗',
      optimal: 'Requis'
    },
    {
      name: 'Mots-clés',
      check: article.keywords && article.keywords.length >= 1 && article.keywords.length <= 10,
      current: article.keywords?.length || 0,
      optimal: '1-10 mots-clés'
    },
    {
      name: 'Image',
      check: article.image && article.image.startsWith('http'),
      current: article.image ? '✓' : '✗',
      optimal: 'URL valide recommandée'
    },
    {
      name: 'Alt text',
      check: !article.image || (article.imageAlt && article.imageAlt.length > 0),
      current: article.imageAlt ? '✓' : '✗',
      optimal: 'Requis si image'
    }
  ];
  
  checks.forEach(check => {
    if (check.check) {
      console.log(`  ✅ ${check.name}: ${check.current}`);
    } else if (check.name === 'Image' || check.name === 'Alt text') {
      console.log(`  ⚠️  ${check.name}: ${check.current} (${check.optimal})`);
      warnings++;
    } else {
      console.log(`  ❌ ${check.name}: ${check.current} (${check.optimal})`);
      errors++;
    }
  });
  
  console.log('');
});

// Résumé
console.log('📈 RÉSUMÉ SEO:');
console.log(`✅ Articles conformes: ${articles.length - Math.ceil(errors / 7)}`);
console.log(`❌ Erreurs: ${errors}`);
console.log(`⚠️  Avertissements: ${warnings}`);

if (errors > 0) {
  console.log('\n🔧 ACTIONS RECOMMANDÉES:');
  console.log('- Corriger les erreurs critiques (titre, excerpt, contenu)');
  console.log('- Ajouter des images aux articles');
  console.log('- Optimiser les longueurs de texte');
}

console.log('\n🚀 BONNES PRATIQUES SEO:');
console.log('- Titre: 10-60 caractères avec mots-clés principaux');
console.log('- Excerpt: 50-160 caractères, résumé engageant');
console.log('- Contenu: 300+ mots, bien structuré avec H2/H3');
console.log('- Images: Optimisées, avec alt text descriptif');
console.log('- Mots-clés: 1-10 mots-clés pertinents');

process.exit(errors > 0 ? 1 : 0);