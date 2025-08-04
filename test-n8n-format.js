// Test reproduction exacte du problème n8n

const API_URL = 'https://agenzys.vercel.app/api/blog';

// Données exactes envoyées par n8n (format reproduit)
const n8nData = {
  "title": "Automatisation immobilière : libérez votre agence des tâches chronophages et boostez votre performance",
  "excerpt": "Optimisez votre agence avec l'automatisation immobilière grâce à Agenzys. Gagnez du temps, boostez vos conversions et simplifiez la gestion de vos leads.", 
  "content": "# Automatisation Immobilière : Comment Transformer vos Tâches Répétitives en Opportunités de Croissance\n\n## Introduction\n\nEn tant que professionnel de l'immobilier, votre journée est un marathon...",
  "category": "automatisation immobilière",
  "keywords": ["marketing automation immobilier", "automatisation immobilière", "optimisation lead immobilier"],
  "image": "https://www.portail-des-pme.fr/images/logiciel-immobilier.jpg"
};

// Test exact reproduction n8n
async function testExactN8N() {
  console.log('=== TEST REPRODUCTION N8N ===');
  
  const bodyString = JSON.stringify(n8nData);
  
  console.log('URL:', API_URL);
  console.log('Taille du body:', bodyString.length);
  console.log('Titre length:', n8nData.title.length);
  console.log('Excerpt length:', n8nData.excerpt.length);
  console.log('Content length:', n8nData.content.length);
  console.log('Category:', n8nData.category);
  console.log('Keywords count:', n8nData.keywords.length);
  console.log('Image URL:', n8nData.image);
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'n8n/1.104.2'
      },
      body: bodyString
    });
    
    const result = await response.json();
    
    console.log('\n=== RÉSULTAT ===');
    console.log('Status:', response.status);
    console.log('Headers response:', Object.fromEntries(response.headers.entries()));
    console.log('Réponse complète:', JSON.stringify(result, null, 2));
    
    if (response.status === 200 && result.success) {
      console.log('\n🎉 SUCCÈS ! Article créé');
      console.log('URL de l\'article:', result.url);
    } else {
      console.log('\n❌ ÉCHEC');
      if (result.errors) {
        console.log('Erreurs spécifiques:', result.errors);
      }
    }
    
  } catch (error) {
    console.error('\n💥 ERREUR de connexion:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Test de validation manuelle des données
function validateDataManually() {
  console.log('\n=== VALIDATION MANUELLE ===');
  
  const checks = [
    { field: 'title', value: n8nData.title, rule: 'length >= 5', result: n8nData.title && n8nData.title.length >= 5 },
    { field: 'excerpt', value: n8nData.excerpt, rule: 'length >= 20', result: n8nData.excerpt && n8nData.excerpt.length >= 20 },
    { field: 'content', value: n8nData.content, rule: 'length >= 100', result: n8nData.content && n8nData.content.length >= 100 },
    { field: 'category', value: n8nData.category, rule: 'string', result: n8nData.category && typeof n8nData.category === 'string' },
    { field: 'keywords', value: n8nData.keywords, rule: 'array length > 0', result: Array.isArray(n8nData.keywords) && n8nData.keywords.length > 0 }
  ];
  
  checks.forEach(check => {
    console.log(`${check.field}: ${check.result ? '✅' : '❌'} (${check.rule})`);
    if (!check.result) {
      console.log(`  Valeur: ${JSON.stringify(check.value)}`);
    }
  });
}

// Exécution
(async () => {
  validateDataManually();
  await testExactN8N();
})();
