import { NextRequest, NextResponse } from 'next/server';
import { verifyCronAuth, verifyAdminAuth } from '@/lib/auth';

// CONFIGURATION DU PLANNING AUTOMATIQUE
const PUBLISHING_SCHEDULE = {
  daysOfWeek: [1, 3, 5], // Lundi, Mercredi, Vendredi
  timeOfDay: '09:00', // 9h du matin
  timezone: 'Europe/Paris'
};

interface PublishingLog {
  date: string;
  success: boolean;
  article?: any;
  error?: string;
  published_url?: string;
}

// VÉRIFICATION SI ON DOIT PUBLIER AUJOURD'HUI
function shouldPublishToday(): boolean {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
  
  return PUBLISHING_SCHEDULE.daysOfWeek.includes(dayOfWeek);
}

// VÉRIFICATION SI C'EST L'HEURE DE PUBLIER
function isPublishingTime(): boolean {
  const now = new Date();
  const currentTime = now.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: PUBLISHING_SCHEDULE.timezone 
  });
  
  // Tolérance de ±30 minutes
  const targetTime = PUBLISHING_SCHEDULE.timeOfDay;
  const [targetHour, targetMinute] = targetTime.split(':').map(Number);
  const [currentHour, currentMinute] = currentTime.split(':').map(Number);
  
  const targetMinutes = targetHour * 60 + targetMinute;
  const currentMinutes = currentHour * 60 + currentMinute;
  
  return Math.abs(currentMinutes - targetMinutes) <= 30;
}

// VÉRIFICATION SI ON A DÉJÀ PUBLIÉ AUJOURD'HUI
async function hasPublishedToday(): Promise<boolean> {
  try {
    // Lire les logs de publication depuis un fichier ou DB
    // Pour l'instant, on simule avec localStorage côté serveur
    const today = new Date().toISOString().split('T')[0];
    
    // TODO: Implémenter un vrai système de logs
    // Pour l'instant, on retourne false pour permettre les tests
    return false;
  } catch {
    return false;
  }
}

// ENREGISTRER LE LOG DE PUBLICATION
async function logPublication(result: PublishingLog): Promise<void> {
  try {
    console.log('📝 Log publication:', result);
    // TODO: Sauvegarder dans une vraie DB ou fichier
  } catch (error) {
    console.error('❌ Erreur sauvegarde log:', error);
  }
}

// ENDPOINT PRINCIPAL D'AUTO-PUBLICATION
export async function POST(request: NextRequest) {
  try {
    // VÉRIFICATION DE SÉCURITÉ
    if (!verifyCronAuth(request) && !verifyAdminAuth(request)) {
      return NextResponse.json({
        success: false,
        error: 'Accès non autorisé'
      }, { status: 401 });
    }

    const { force = false } = await request.json().catch(() => ({}));
    
    console.log('🤖 Vérification auto-publication...');
    
    // Vérifications de planning (sauf si forcé)
    if (!force) {
      if (!shouldPublishToday()) {
        return NextResponse.json({
          success: false,
          message: 'Pas de publication prévue aujourd\'hui',
          schedule: PUBLISHING_SCHEDULE
        });
      }
      
      if (!isPublishingTime()) {
        return NextResponse.json({
          success: false,
          message: 'Pas encore l\'heure de publier',
          schedule: PUBLISHING_SCHEDULE,
          currentTime: new Date().toLocaleTimeString('fr-FR', { timeZone: PUBLISHING_SCHEDULE.timezone })
        });
      }
      
      if (await hasPublishedToday()) {
        return NextResponse.json({
          success: false,
          message: 'Article déjà publié aujourd\'hui'
        });
      }
    }
    
    console.log('✅ Conditions remplies, génération article...');
    
    // Appeler le générateur d'articles
    const generateResponse = await fetch('https://agenzys.vercel.app/api/ai/generate-article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tone: 'professional',
        length: 'medium'
      })
    });
    
    const generateResult = await generateResponse.json();
    
    if (!generateResult.success) {
      throw new Error(`Erreur génération: ${generateResult.error}`);
    }
    
    console.log('📝 Publication de l\'article sur le blog...');
    
    // ÉTAPE 2: Publier l'article sur le blog
    const publishResponse = await fetch('https://agenzys.vercel.app/api/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: generateResult.article.title,
        excerpt: generateResult.article.excerpt,
        content: generateResult.article.content,
        category: generateResult.article.category,
        keywords: generateResult.article.keywords,
        image: generateResult.article.image,
        imageAlt: generateResult.article.imageAlt
      })
    });
    
    const publishResult = await publishResponse.json();
    
    if (!publishResult.success) {
      throw new Error(`Erreur publication: ${publishResult.error || 'Publication échouée'}`);
    }
    
    console.log('🎉 Article publié avec succès:', publishResult.url);
    
    // Log du succès complet
    await logPublication({
      date: new Date().toISOString(),
      success: true,
      article: generateResult.article,
      published_url: publishResult.url
    });
    
    return NextResponse.json({
      success: true,
      message: '🎉 Article généré et publié automatiquement !',
      publication: {
        ...generateResult,
        published_url: publishResult.url,
        blog_data: publishResult
      },
      scheduled: !force,
      nextPublication: getNextPublicationDate()
    });
    
  } catch (error) {
    console.error('❌ Erreur auto-publication:', error);
    
    // Log de l'erreur
    await logPublication({
      date: new Date().toISOString(),
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur auto-publication'
    }, { status: 500 });
  }
}

// CALCULER LA PROCHAINE DATE DE PUBLICATION
function getNextPublicationDate(): string {
  const now = new Date();
  const currentDay = now.getDay();
  
  // Trouver le prochain jour de publication
  const nextDays = PUBLISHING_SCHEDULE.daysOfWeek
    .map(day => {
      const daysUntil = (day - currentDay + 7) % 7;
      return daysUntil === 0 ? 7 : daysUntil; // Si c'est aujourd'hui, prendre la semaine prochaine
    })
    .sort((a, b) => a - b);
  
  const daysUntilNext = nextDays[0];
  const nextDate = new Date(now.getTime() + daysUntilNext * 24 * 60 * 60 * 1000);
  
  return nextDate.toLocaleDateString('fr-FR', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) + ` à ${PUBLISHING_SCHEDULE.timeOfDay}`;
}

// ENDPOINT GET POUR VÉRIFIER LE STATUS
export async function GET() {
  const now = new Date();
  const shouldPublish = shouldPublishToday();
  const isTime = isPublishingTime();
  const hasPublished = await hasPublishedToday();
  
  return NextResponse.json({
    message: 'Système d\'auto-publication Agenzys',
    status: {
      currentTime: now.toLocaleString('fr-FR', { timeZone: PUBLISHING_SCHEDULE.timezone }),
      shouldPublishToday: shouldPublish,
      isPublishingTime: isTime,
      hasPublishedToday: hasPublished,
      readyToPublish: shouldPublish && isTime && !hasPublished
    },
    schedule: PUBLISHING_SCHEDULE,
    nextPublication: getNextPublicationDate()
  });
}