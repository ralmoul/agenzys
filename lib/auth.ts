import { NextRequest } from 'next/server';

// CLÉS D'API SÉCURISÉES (à mettre dans .env.local)
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'agenzys_admin_key_2025_secure';
const CRON_SECRET = process.env.CRON_SECRET || 'vercel_cron_secret_2025';

/**
 * Vérification de l'authentification admin
 */
export function verifyAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const apiKey = request.headers.get('x-api-key');
  
  // Vérifier le token Bearer ou la clé API
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    return token === ADMIN_API_KEY;
  }
  
  if (apiKey) {
    return apiKey === ADMIN_API_KEY;
  }
  
  return false;
}

/**
 * Vérification de l'authentification cron (Vercel)
 */
export function verifyCronAuth(request: NextRequest): boolean {
  const cronSecret = request.headers.get('x-vercel-cron-secret');
  const userAgent = request.headers.get('user-agent');
  
  // Vérifier le secret cron de Vercel
  if (cronSecret === CRON_SECRET) {
    return true;
  }
  
  // Vérifier l'User-Agent de Vercel
  if (userAgent?.includes('vercel-cron')) {
    return true;
  }
  
  // En développement, autoriser localhost
  if (process.env.NODE_ENV === 'development') {
    const host = request.headers.get('host');
    if (host?.includes('localhost') || host?.includes('127.0.0.1')) {
      return true;
    }
  }
  
  return false;
}

/**
 * Middleware d'authentification pour les routes admin
 */
export function requireAuth(handler: (request: NextRequest) => Promise<Response>) {
  return async (request: NextRequest) => {
    if (!verifyAdminAuth(request)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Accès non autorisé. Authentification requise.' 
        }),
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    return handler(request);
  };
}

/**
 * Middleware d'authentification pour les tâches cron
 */
export function requireCronAuth(handler: (request: NextRequest) => Promise<Response>) {
  return async (request: NextRequest) => {
    if (!verifyCronAuth(request)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Accès cron non autorisé.' 
        }),
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    return handler(request);
  };
}