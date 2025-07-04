import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '@/components/ui/navigation';
import { AIAssistant } from '@/components/ai/ai-assistant';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="relative">
        <Outlet />
      </main>
      <AIAssistant variant="floating" />
    </div>
  );
}