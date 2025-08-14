'use client';

import { useEffect } from 'react';
import { initializeChatbaseWithAuth, initializeChatbaseAnonymous } from '@/lib/chatbase';

interface ChatbaseInitProps {
  userId?: string;
  userEmail?: string;
  userName?: string;
}

/**
 * Composant pour initialiser Chatbase avec ou sans authentification
 * Utilisez ce composant dans vos pages où vous voulez activer le chat
 */
export function ChatbaseInit({ userId, userEmail, userName }: ChatbaseInitProps) {
  useEffect(() => {
    // Attendre que le script Chatbase soit chargé
    const checkChatbase = () => {
      if (window.chatbase) {
        if (userId) {
          // Utilisateur connecté - utiliser l'authentification HMAC
          initializeChatbaseWithAuth(userId, userEmail, userName);
        } else {
          // Utilisateur anonyme
          initializeChatbaseAnonymous();
        }
      } else {
        // Réessayer après 100ms si Chatbase n'est pas encore chargé
        setTimeout(checkChatbase, 100);
      }
    };

    checkChatbase();
  }, [userId, userEmail, userName]);

  return null; // Ce composant ne rend rien visuellement
}

export default ChatbaseInit;
