'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface SystemStatus {
  currentTime: string;
  shouldPublishToday: boolean;
  isPublishingTime: boolean;
  hasPublishedToday: boolean;
  readyToPublish: boolean;
  nextPublication: string;
}

// SYSTÈME D'AUTHENTIFICATION SIMPLE
function AdminAuth({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mot de passe simple (à changer en production)
    if (password === 'agenzys2025admin') {
      onAuth();
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
      <div className="bg-white dark:bg-neutral-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">🔒 Accès Admin</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Mot de passe administrateur
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-neutral-800"
              placeholder="Entrez le mot de passe"
              autoComplete="current-password"
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm text-center">
              ❌ {error}
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            🔓 Accéder à l'administration
          </Button>
        </form>
        
        <div className="mt-6 text-xs text-neutral-500 text-center">
          ⚠️ Accès restreint au personnel autorisé uniquement
        </div>
      </div>
    </div>
  );
}

// COMPOSANT ADMIN PRINCIPAL (SÉCURISÉ)
function AdminDashboard() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastGeneration, setLastGeneration] = useState<any>(null);

  // Charger le status au démarrage
  useEffect(() => {
    loadStatus();
    // Actualiser toutes les minutes
    const interval = setInterval(loadStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadStatus = async () => {
    try {
      const response = await fetch('/api/ai/auto-publish');
      const data = await response.json();
      setStatus(data.status);
    } catch (error) {
      console.error('Erreur chargement status:', error);
    }
  };

  const testGeneration = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const result = await response.json();
      setLastGeneration(result);
      await loadStatus(); // Actualiser le status
    } catch (error) {
      console.error('Erreur test:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const forcePublication = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/auto-publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ force: true })
      });
      const result = await response.json();
      
      if (result.success && result.publication) {
        // Adapter la structure pour l'affichage
        setLastGeneration({
          success: true,
          message: result.message,
          article: {
            ...result.publication.article,
            published: {
              url: `https://agenzys.vercel.app/blog/${result.publication.article.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'article'}`
            }
          }
        });
      } else {
        setLastGeneration(result);
      }
      
      await loadStatus();
    } catch (error) {
      console.error('Erreur publication forcée:', error);
      setLastGeneration({
        success: false,
        error: 'Erreur lors de la publication forcée'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">
            🤖 Admin IA - Génération Automatique
          </h1>
          <div className="text-sm bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 px-3 py-1 rounded">
            🔒 MODE ADMIN
          </div>
        </div>

        {/* Status du système */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">📊 Status du Système</h2>
          
          {status ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Heure actuelle:</span>
                  <span className="font-mono text-blue-600">{status.currentTime}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Publication prévue aujourd'hui:</span>
                  <span className={status.shouldPublishToday ? 'text-green-600' : 'text-gray-400'}>
                    {status.shouldPublishToday ? '✅ Oui' : '❌ Non'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Heure de publication:</span>
                  <span className={status.isPublishingTime ? 'text-green-600' : 'text-gray-400'}>
                    {status.isPublishingTime ? '✅ Maintenant' : '⏰ Pas encore'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Déjà publié aujourd'hui:</span>
                  <span className={status.hasPublishedToday ? 'text-orange-600' : 'text-green-600'}>
                    {status.hasPublishedToday ? '⚠️ Oui' : '✅ Non'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Prêt à publier:</span>
                  <span className={status.readyToPublish ? 'text-green-600 font-bold' : 'text-gray-400'}>
                    {status.readyToPublish ? '🚀 OUI' : '⏸️ Non'}
                  </span>
                </div>
              </div>
              
              <div className="col-span-2 mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <strong>Prochaine publication automatique:</strong><br />
                <span className="text-blue-600">{status.nextPublication}</span>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">Chargement du status...</div>
          )}
        </div>

        {/* Actions manuelles */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">🎛️ Actions Manuelles</h2>
          
          <div className="flex gap-4 flex-wrap">
            <Button
              onClick={testGeneration}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? '⏳ Génération...' : '🧪 Test Génération Article'}
            </Button>
            
            <Button
              onClick={forcePublication}
              disabled={isLoading}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isLoading ? '⏳ Publication...' : '🚀 Forcer Publication'}
            </Button>
            
            <Button
              onClick={loadStatus}
              variant="outline"
            >
              🔄 Actualiser Status
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
            <strong>⚠️ Attention:</strong> La publication forcée ignore le planning automatique et publie immédiatement.
          </div>
        </div>

        {/* Dernier résultat */}
        {lastGeneration && (
          <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">📝 Dernier Article Généré</h2>
            
            {lastGeneration.success ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded border-l-4 border-green-500">
                  <p className="text-green-800 dark:text-green-200 font-semibold">
                    ✅ {lastGeneration.message}
                  </p>
                </div>
                
                {lastGeneration.article && (
                  <div className="space-y-3">
                    <div>
                      <strong>Méthode:</strong> {lastGeneration.article.generation_method}
                    </div>
                    <div>
                      <strong>Titre:</strong> {lastGeneration.article.title}
                    </div>
                    <div>
                      <strong>Catégorie:</strong> {lastGeneration.article.category}
                    </div>
                    <div>
                      <strong>Type:</strong> {lastGeneration.article.type}
                    </div>
                    <div>
                      <strong>Mots-clés:</strong> {lastGeneration.article.keywords?.join(', ')}
                    </div>
                    {lastGeneration.article.published?.url && (
                      <div>
                        <strong>URL:</strong>{' '}
                        <a 
                          href={lastGeneration.article.published.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {lastGeneration.article.published.url}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded border-l-4 border-red-500">
                <p className="text-red-800 dark:text-red-200">
                  ❌ Erreur: {lastGeneration.error}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Infos système */}
        <div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded text-sm text-neutral-600 dark:text-neutral-400">
          <h3 className="font-semibold mb-2">ℹ️ Configuration Système</h3>
          <ul className="space-y-1">
            <li>📅 <strong>Planning:</strong> Lundi, Mercredi, Vendredi à 9h00 (Europe/Paris)</li>
            <li>🤖 <strong>Génération:</strong> Articles automatiques avec templates IA</li>
            <li>📸 <strong>Images:</strong> Sélection automatique d'images Unsplash</li>
            <li>🔄 <strong>Déclencheur:</strong> Vercel Cron Jobs (crons toutes les heures)</li>
            <li>🔒 <strong>Sécurité:</strong> Accès protégé par mot de passe</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// COMPOSANT PRINCIPAL AVEC AUTHENTIFICATION
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('admin_authenticated', 'true');
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuth={handleAuth} />;
  }

  return <AdminDashboard />;
}