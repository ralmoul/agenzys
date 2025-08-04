// Test de l'API SANS signature HMAC

const API_URL = 'https://agenzys.vercel.app/api/blog';

// Données de test
const testData = {
  title: "Test Sans Signature " + new Date().getTime(),
  excerpt: "Test de l'API simplifiée sans signature HMAC pour vérifier que l'automatisation fonctionne.",
  content: "Contenu de test détaillé pour vérifier que l'API fonctionne correctement sans signature HMAC. Cette version simplifiée devrait permettre à votre automatisation de fonctionner sans problème. Le contenu doit faire plus de 100 caractères pour passer la validation.",
  category: "test",
  keywords: ["test", "automatisation", "api", "sans-signature"],
  author: "Test Automatisation"
};

// Test POST sans signature
async function testPOSTNoSignature() {
  console.log('=== TEST POST SANS SIGNATURE ===');
  
  const bodyString = JSON.stringify(testData);
  
  console.log('URL:', API_URL);
  console.log('Body preview:', bodyString.substring(0, 100) + '...');
  console.log('Headers: Content-Type uniquement (pas de signature)');
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Agenzys-Test-Tool/1.0'
      },
      body: bodyString
    });
    
    const result = await response.json();
    
    console.log('\n=== RÉSULTAT ===');
    console.log('Status:', response.status);
    console.log('Réponse:', JSON.stringify(result, null, 2));
    
    if (response.status === 200 && result.success) {
      console.log('\n🎉 SUCCÈS ! L\'API fonctionne maintenant sans signature');
      console.log('URL de l\'article:', result.url);
    } else {
      console.log('\n❌ ÉCHEC - Voir les détails ci-dessus');
    }
    
  } catch (error) {
    console.error('\n💥 ERREUR de connexion:', error.message);
  }
}

// Exécution du test
testPOSTNoSignature();
