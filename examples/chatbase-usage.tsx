/**
 * EXEMPLES D'UTILISATION DU CHATBOT CHATBASE
 * 
 * Ce fichier montre comment utiliser le chatbot Chatbase avec différents scénarios d'authentification
 */

import ChatbaseInit from '@/components/chatbase-init';

// ========================================
// EXEMPLE 1: Utilisateur anonyme (par défaut)
// ========================================
export function PageAnonymous() {
  return (
    <div>
      <h1>Page publique</h1>
      <p>Le chatbot sera disponible pour les utilisateurs anonymes</p>
      
      {/* Pas besoin de props pour les utilisateurs anonymes */}
      <ChatbaseInit />
    </div>
  );
}

// ========================================
// EXEMPLE 2: Utilisateur connecté avec authentification
// ========================================
export function PageAuthenticated() {
  // Simuler des données utilisateur (à remplacer par vos vraies données)
  const user = {
    id: 'user_12345',
    email: 'user@example.com',
    name: 'Jean Dupont'
  };

  return (
    <div>
      <h1>Tableau de bord utilisateur</h1>
      <p>Bienvenue {user.name}!</p>
      
      {/* Chatbot avec authentification HMAC */}
      <ChatbaseInit 
        userId={user.id}
        userEmail={user.email}
        userName={user.name}
      />
    </div>
  );
}

// ========================================
// EXEMPLE 3: Utilisation conditionnelle basée sur l'état d'authentification
// ========================================
interface User {
  id: string;
  email: string;
  name: string;
}

interface ConditionalChatProps {
  user?: User | null;
}

export function ConditionalChatPage({ user }: ConditionalChatProps) {
  return (
    <div>
      <h1>Page avec chat conditionnel</h1>
      
      {user ? (
        <>
          <p>Connecté en tant que {user.name}</p>
          <ChatbaseInit 
            userId={user.id}
            userEmail={user.email}
            userName={user.name}
          />
        </>
      ) : (
        <>
          <p>Utilisateur non connecté</p>
          <ChatbaseInit />
        </>
      )}
    </div>
  );
}

// ========================================
// EXEMPLE 4: Intégration avec un système d'authentification Next.js
// ========================================
/*
// Si vous utilisez next-auth ou un autre système d'auth, voici un exemple :

import { useSession } from 'next-auth/react';

export function PageWithNextAuth() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Page avec Next Auth</h1>
      
      {session?.user && (
        <ChatbaseInit 
          userId={session.user.id}
          userEmail={session.user.email || undefined}
          userName={session.user.name || undefined}
        />
      )}
      
      {!session && <ChatbaseInit />}
    </div>
  );
}
*/

// ========================================
// NOTES IMPORTANTES POUR LA SÉCURITÉ
// ========================================
/*
1. La clé secrète CHATBASE_SECRET_KEY doit être stockée dans .env.local
2. Ne jamais exposer cette clé côté client
3. Le HMAC est généré côté serveur pour garantir la sécurité
4. Chaque utilisateur connecté a un hash unique pour l'authentification

CONFIGURATION .env.local :
CHATBASE_SECRET_KEY=fcm7gvnsz6yfuh92hphoo8uiaz5o75e8

SÉCURITÉ EN PRODUCTION :
- Utilisez des variables d'environnement sécurisées
- Ne committez jamais la clé secrète
- Considérez la rotation des clés pour plus de sécurité
*/
