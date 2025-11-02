/// <reference types="vite/client" />

interface Window {
  gtag: (
    command: 'config' | 'event',
    targetId: string,
    config?: Record<string, unknown>
  ) => void;
}