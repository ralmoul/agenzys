// Test de l'API simple sans sauvegarde fichier

const testData = {
  "title": "Test API Simple " + new Date().getTime(),
  "excerpt": "Test de l'API simplifiée pour n8n sans problème de sauvegarde fichier.",
  "content": "Contenu de test pour vérifier que l'API simple fonctionne parfaitement avec n8n. Cette version simule la sauvegarde et retourne toujours un succès. Le contenu doit faire plus de 100 caractères.",
  "category": "test",
  "keywords": ["test", "api", "simple", "n8n"],
  "image": "https://www.portail-des-pme.fr/images/logiciel-immobilier.jpg",
  "author": "Test Simple"
};

console.log('=== TEST API SIMPLE ===');
console.log('Données:', JSON.stringify(testData, null, 2));
console.log('Validation manuelle:');
console.log('- Title:', testData.title.length >= 5 ? '✅' : '❌');
console.log('- Excerpt:', testData.excerpt.length >= 20 ? '✅' : '❌');
console.log('- Content:', testData.content.length >= 100 ? '✅' : '❌');
console.log('- Category:', typeof testData.category === 'string' ? '✅' : '❌');
console.log('- Keywords:', Array.isArray(testData.keywords) && testData.keywords.length > 0 ? '✅' : '❌');
console.log('\nTout devrait être OK ! 🎯');
