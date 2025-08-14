import crypto from 'crypto';

// Clé secrète Chatbase - À GARDER SECRÈTE !
// En production, utilisez une variable d'environnement
const CHATBASE_SECRET_KEY = process.env.CHATBASE_SECRET_KEY || 'fcm7gvnsz6yfuh92hphoo8uiaz5o75e8';

/**
 * Génère un HMAC pour l'authentification Chatbase
 * @param userId - ID unique de l'utilisateur connecté
 * @param userEmail - Email de l'utilisateur (optionnel)
 * @returns Hash HMAC pour la vérification d'identité
 */
export function generateChatbaseHMAC(userId: string, userEmail?: string): string {
  const data = userEmail ? `${userId}:${userEmail}` : userId;
  return crypto
    .createHmac('sha256', CHATBASE_SECRET_KEY)
    .update(data)
    .digest('hex');
}

/**
 * Initialise Chatbase avec vérification d'identité pour un utilisateur connecté
 * @param userId - ID unique de l'utilisateur
 * @param userEmail - Email de l'utilisateur (optionnel)
 * @param userName - Nom de l'utilisateur (optionnel)
 */
export function initializeChatbaseWithAuth(
  userId: string, 
  userEmail?: string, 
  userName?: string
) {
  if (typeof window !== 'undefined' && window.chatbase) {
    const hmac = generateChatbaseHMAC(userId, userEmail);
    
    window.chatbase('identify', {
      userId: userId,
      userHash: hmac,
      userEmail: userEmail,
      userName: userName,
    });
  }
}

/**
 * Initialise Chatbase pour un utilisateur anonyme
 */
export function initializeChatbaseAnonymous() {
  if (typeof window !== 'undefined' && window.chatbase) {
    window.chatbase('identify', {
      userId: 'anonymous',
    });
  }
}

// Types pour TypeScript
declare global {
  interface Window {
    chatbase: any;
  }
}
