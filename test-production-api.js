const crypto = require('crypto');

// Configuration PRODUCTION
const API_URL = 'https://agenzys.vercel.app/api/blog';
const API_SECRET = 'agenzys_blog_secret_key_2024_secure';

// Données de test
const testData = {
  title: "Test Production API " + new Date().getTime(),
  excerpt: "Test de l'API en production pour diagnostiquer le problème d'automatisation.",
  content: "Contenu de test pour vérifier le fonctionnement de l'API blog en production. Ce test permet d'identifier les problèmes de signature HMAC et de validation des données. Le contenu doit être suffisamment long pour passer la validation minimale de 100 caractères.",
  category: "diagnostic",
  keywords: ["test", "production", "debug", "api"],
  author: "Diagnostic Tool"
};

// Génération de la signature HMAC
function generateSignature(body, secret) {
  return 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
}

// Test GET
async function testGET() {
  console.log('=== TEST PRODUCTION GET ===');
  console.log('URL:', API_URL);
  
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'User-Agent': 'Agenzys-Diagnostic-Tool/1.0'
      }
    });
    
    const result = await response.json();
    
    console.log('Status:', response.status);
    console.log('Réponse:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('Erreur GET:', error.message);
  }
}

// Test POST avec signature
async function testPOST() {
  console.log('\n=== TEST PRODUCTION POST ===');
  
  const bodyString = JSON.stringify(testData);
  const signature = generateSignature(bodyString, API_SECRET);
  
  console.log('Body preview:', bodyString.substring(0, 100) + '...');
  console.log('Signature:', signature);
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-signature': signature,
        'User-Agent': 'Agenzys-Diagnostic-Tool/1.0'
      },
      body: bodyString
    });
    
    const result = await response.json();
    
    console.log('Status:', response.status);
    console.log('Réponse:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('Erreur POST:', error.message);
  }
}

// Test health
async function testHealth() {
  console.log('\n=== TEST HEALTH ===');
  
  try {
    const response = await fetch('https://agenzys.vercel.app/api/health');
    const result = await response.json();
    
    console.log('Status:', response.status);
    console.log('Health:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('Erreur Health:', error.message);
  }
}

// Exécution des tests
(async () => {
  await testHealth();
  await testGET();
  await testPOST();
})();
