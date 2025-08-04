// Test de l'API avec image

const API_URL = 'https://agenzys.vercel.app/api/blog';

// Données de test avec image
const testDataWithImage = {
  title: "Test Article avec Image " + new Date().getTime(),
  excerpt: "Test de l'API avec support des images pour vérifier que l'automatisation fonctionne avec tous les champs.",
  content: "Contenu de test détaillé pour vérifier que l'API fonctionne correctement avec les images. Cette version inclut maintenant le support complet des images avec URL et texte alternatif. Le contenu doit faire plus de 100 caractères pour passer la validation. L'image sera affichée dans l'article automatiquement.",
  category: "test",
  keywords: ["test", "automatisation", "api", "images", "blog"],
  author: "Test Automatisation",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
  imageAlt: "Image de test représentant l'automatisation et la technologie"
};

// Test POST avec image
async function testPOSTWithImage() {
  console.log('=== TEST POST AVEC IMAGE ===');
  
  const bodyString = JSON.stringify(testDataWithImage);
  
  console.log('URL:', API_URL);
  console.log('Titre:', testDataWithImage.title);
  console.log('Image URL:', testDataWithImage.image);
  console.log('Image Alt:', testDataWithImage.imageAlt);
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Agenzys-Test-Image/1.0'
      },
      body: bodyString
    });
    
    const result = await response.json();
    
    console.log('\n=== RÉSULTAT ===');
    console.log('Status:', response.status);
    console.log('Réponse:', JSON.stringify(result, null, 2));
    
    if (response.status === 200 && result.success) {
      console.log('\n🎉 SUCCÈS ! Article avec image créé');
      console.log('URL de l\'article:', result.url);
      console.log('Slug:', result.slug);
    } else {
      console.log('\n❌ ÉCHEC - Voir les détails ci-dessus');
    }
    
  } catch (error) {
    console.error('\n💥 ERREUR de connexion:', error.message);
  }
}

// Test sans image (pour comparaison)
async function testPOSTWithoutImage() {
  console.log('\n=== TEST POST SANS IMAGE ===');
  
  const testDataNoImage = {
    title: "Test Article sans Image " + new Date().getTime(),
    excerpt: "Test de l'API sans image pour comparaison avec la version avec image.",
    content: "Contenu de test sans image pour vérifier la rétrocompatibilité. L'API doit fonctionner avec ou sans image selon les besoins de l'automatisation. Ce test valide que les champs image sont optionnels.",
    category: "test",
    keywords: ["test", "sans-image", "api"],
    author: "Test Sans Image"
  };
  
  const bodyString = JSON.stringify(testDataNoImage);
  
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
    console.log('Succès sans image:', result.success);
    
  } catch (error) {
    console.error('Erreur test sans image:', error.message);
  }
}

// Exécution des tests
(async () => {
  await testPOSTWithImage();
  await testPOSTWithoutImage();
})();
