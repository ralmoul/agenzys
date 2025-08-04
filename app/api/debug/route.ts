import { NextRequest, NextResponse } from 'next/server'

// Simuler un stockage en mémoire pour les logs de debug
// (en production, cela serait dans une base de données)
let debugLogs: any[] = []

export async function GET() {
  return NextResponse.json({
    status: 'Debug API Active',
    timestamp: new Date().toISOString(),
    logs_count: debugLogs.length,
    latest_logs: debugLogs.slice(-5), // 5 derniers logs
    message: 'Endpoint de debug pour voir les requêtes n8n'
  })
}

// Fonction pour ajouter un log (appelée depuis l'API blog)
export function addDebugLog(data: any) {
  debugLogs.push({
    timestamp: new Date().toISOString(),
    ...data
  })
  
  // Garder seulement les 50 derniers logs
  if (debugLogs.length > 50) {
    debugLogs = debugLogs.slice(-50)
  }
}
