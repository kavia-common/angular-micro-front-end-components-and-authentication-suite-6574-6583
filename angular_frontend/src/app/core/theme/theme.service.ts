import { Injectable, signal } from '@angular/core';

export interface ThemePalette {
  name: string;
  description: string;
  primary: string;
  secondary: string;
  success: string;
  error: string;
  background: string;
  surface: string;
  text: string;
  gradientFrom: string;
  gradientTo: string;
}

/**
 * PUBLIC_INTERFACE
 * ThemeService manages runtime theme tokens used across components and global styles.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentThemeSignal = signal<ThemePalette>({
    name: 'Ocean Professional',
    description: 'Blue & amber accents',
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    gradientFrom: 'rgba(59,130,246,0.10)',
    gradientTo: 'rgba(249,250,251,1)'
  });

  // PUBLIC_INTERFACE
  theme() {
    return this.currentThemeSignal();
  }

  // PUBLIC_INTERFACE
  setTheme(theme: Partial<ThemePalette>) {
    this.currentThemeSignal.update(t => ({ ...t, ...theme }));
    this.applyCssVars();
  }

  constructor() {
    this.applyCssVars();
  }

  private applyCssVars() {
    const t = this.currentThemeSignal();
    // Guard against SSR environments where document is not defined
    const g: any = (typeof globalThis !== 'undefined') ? globalThis : {};
    const doc: any = g.document as any;
    if (!doc) return;
    const root = doc.documentElement;
    root.style.setProperty('--color-primary', t.primary);
    root.style.setProperty('--color-secondary', t.secondary);
    root.style.setProperty('--color-success', t.success);
    root.style.setProperty('--color-error', t.error);
    root.style.setProperty('--color-background', t.background);
    root.style.setProperty('--color-surface', t.surface);
    root.style.setProperty('--color-text', t.text);
    root.style.setProperty('--gradient-from', t.gradientFrom);
    root.style.setProperty('--gradient-to', t.gradientTo);
    root.style.setProperty('--radius-md', '12px');
    root.style.setProperty('--radius-lg', '16px');
    root.style.setProperty('--shadow-sm', '0 1px 2px rgba(0,0,0,0.06)');
    root.style.setProperty('--shadow-md', '0 4px 10px rgba(0,0,0,0.08)');
    root.style.setProperty('--transition-fast', '150ms ease');
    root.style.setProperty('--transition', '240ms cubic-bezier(0.2, 0, 0, 1)');
  }
}
