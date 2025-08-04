const crypto = require('crypto');

// Configuration
const API_URL = 'http://localhost:3000/api/blog';
const API_SECRET = 'agenzys_blog_secret_key_2024_secure';

// Données de test
const testData = {
  title: "Test Article Automatisation",
  excerpt: "Ceci est un test de l'automatisation des articles de blog pour Agenzys.",
  content: "Contenu de test détaillé pour vérifier que l'API fonctionne correctement avec l'automatisation. Ce contenu doit faire plus de 100 caractères pour passer la validation.",
  category: "test",
  keywords: ["test", "automatisation", "api"],
  author: "Test Automation"
};

// Génération de la signature HMAC
function generateSignature(body, secret) {
  return 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
}

// Test de l'API
async function testAPI() {
  const bodyString = JSON.stringify(testData);
  const signature = generateSignature(bodyString, API_SECRET);
  
  console.log('=== TEST API BLOG ===');
  console.log('URL:', API_URL);
  console.log('Body:', bodyString.substring(0, 100) + '...');
  console.log('Signature générée:', signature);
  console.log('Secret utilisé:', API_SECRET);
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-signature': signature
      },
      body: bodyString
    });
    
    const result = await response.json();
    
    console.log('\n=== RÉPONSE API ===');
    console.log('Status:', response.status);
    console.log('Réponse:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('Erreur requête:', error.message);
  }
}

// Test sans signature (mode debug)
async function testAPINoSignature() {
  const bodyString = JSON.stringify(testData);
  
  console.log('\n=== TEST SANS SIGNATURE ===');
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: bodyString
    });
    
    const result = await response.json();
    
    console.log('Status:', response.status);
    console.log('Réponse:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('Erreur requête:', error.message);
  }
}

// Test GET (vérification état)
async function testGET() {
  console.log('\n=== TEST GET ===');
  
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    
    console.log('Status:', response.status);
    console.log('Réponse:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('Erreur requête:', error.message);
  }
}

// Exécution des tests
(async () => {
  await testGET();
  await testAPI();
  await testAPINoSignature();
})();
