# 🤖 Configuration Chatbase pour Agenzys

## 📋 Résumé de l'installation

Le chatbot Chatbase a été intégré avec succès dans votre application Agenzys avec support de l'authentification HMAC sécurisée.

## 🔧 Fichiers ajoutés/modifiés

### Fichiers modifiés :
- `app/layout.tsx` - Script Chatbase intégré + composant d'initialisation
- `lib/chatbase.ts` - Fonctions utilitaires pour l'authentification HMAC
- `components/chatbase-init.tsx` - Composant React pour initialiser Chatbase

### Fichiers d'exemple :
- `examples/chatbase-usage.tsx` - Exemples d'utilisation du chatbot

## 🚀 Utilisation

### 1. Pour utilisateurs anonymes (automatique)
Le chatbot apparaîtra automatiquement sur toutes les pages sans configuration supplémentaire.

### 2. Pour utilisateurs connectés avec authentification
```tsx
import ChatbaseInit from '@/components/chatbase-init';

function MaPage() {
  const user = {
    id: 'user_123',
    email: 'user@example.com',
    name: 'Jean Dupont'
  };

  return (
    <div>
      <h1>Ma page</h1>
      <ChatbaseInit 
        userId={user.id}
        userEmail={user.email}
        userName={user.name}
      />
    </div>
  );
}
```

## 🔐 Configuration de sécurité

### Variables d'environnement recommandées
Créez un fichier `.env.local` avec :
```env
# ⚠️ GARDEZ CETTE CLÉ SECRÈTE
CHATBASE_SECRET_KEY=fcm7gvnsz6yfuh92hphoo8uiaz5o75e8
```

### Sécurité en production
- ✅ La clé secrète ne doit jamais être exposée côté client
- ✅ L'authentification HMAC garantit l'identité des utilisateurs
- ✅ Chaque utilisateur a un hash unique et sécurisé

## 📡 Configuration Chatbase

### Identifiants du projet :
- **ID du chatbot** : `Px45w8Wrw12r_qvx-bPNr`
- **Domaine** : `www.chatbase.co`
- **Clé secrète** : `fcm7gvnsz6yfuh92hphoo8uiaz5o75e8`

## 🧪 Test de l'intégration

1. **Lancez votre serveur de développement** :
   ```bash
   npm run dev
   ```

2. **Visitez votre site** à `http://localhost:3000`

3. **Vérifiez que le widget chat apparaît** (généralement en bas à droite)

4. **Testez la fonctionnalité** en posant une question au chatbot

## 🔍 Débogage

### Si le chatbot n'apparaît pas :
1. Vérifiez la console du navigateur pour les erreurs JavaScript
2. Assurez-vous que le script Chatbase se charge correctement
3. Vérifiez que l'ID du chatbot est correct : `Px45w8Wrw12r_qvx-bPNr`

### Console du navigateur :
Vous pouvez tester manuellement dans la console :
```javascript
// Vérifier si Chatbase est chargé
console.log(window.chatbase);

// Tester l'initialisation manuelle
window.chatbase('identify', { userId: 'test123' });
```

## 🚀 Déploiement

Après avoir testé localement, committez vos changements :
```bash
git add .
git commit -m "feat: Intégration chatbot Chatbase avec authentification HMAC"
git push origin main
```

Le déploiement sur Vercel se fera automatiquement grâce à votre configuration existante.

## ⚙️ Personnalisation avancée

Pour personnaliser davantage le chatbot, consultez la [documentation Chatbase](https://docs.chatbase.co/) pour les options disponibles comme :
- Personnalisation de l'apparence
- Configuration des déclencheurs
- Intégration avec d'autres services
- Analytics et rapports

## 🆘 Support

En cas de problème :
1. Consultez la [documentation officielle Chatbase](https://docs.chatbase.co/)
2. Vérifiez les logs de votre application
3. Contactez le support Chatbase si nécessaire

---

✅ **Installation terminée !** Votre chatbot Chatbase est maintenant opérationnel sur Agenzys.

