import { Injectable } from '@angular/core';

export type FeatureFlags = {
  [key: string]: boolean;
};

export interface AppEnvironment {
  apiBase: string;
  backendUrl: string;
  frontendUrl: string;
  wsUrl: string;
  nodeEnv: string;
  telemetryDisabled: boolean;
  enableSourceMaps: boolean;
  port?: number;
  trustProxy?: boolean;
  logLevel?: string;
  healthcheckPath?: string;
  featureFlags: FeatureFlags;
  experimentsEnabled?: boolean;
}

/**
 * PUBLIC_INTERFACE
 * Provides runtime configuration derived from injected NG_APP_* environment variables (via process.env when available).
 * In browser builds, these values can be inlined by the bundler if defined. Defaults included for safety.
 */
@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  private readonly env: AppEnvironment;

  constructor() {
    // Attempt to read from process.env if present (SSR/Node), fallback to window variables or defaults.
    const anyGlobal = (globalThis as any) || {};
    const pe = (typeof process !== 'undefined' && (process as any)?.env) ? (process as any).env : {};
    const we = anyGlobal?.NG_APP_ENV || {};

    const parseBool = (v: any, def = false) =>
      typeof v === 'string' ? ['1', 'true', 'yes', 'on'].includes(v.toLowerCase()) : (typeof v === 'boolean' ? v : def);

    const parseNumber = (v: any, def?: number) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : def;
    };

    const parseFlags = (v: any): FeatureFlags => {
      if (!v) return {};
      try {
        if (typeof v === 'string') return JSON.parse(v);
        if (typeof v === 'object') return v as FeatureFlags;
      } catch {
        // ignore
      }
      return {};
    };

    this.env = {
      apiBase: pe.NG_APP_API_BASE || we.NG_APP_API_BASE || '',
      backendUrl: pe.NG_APP_BACKEND_URL || we.NG_APP_BACKEND_URL || '',
      frontendUrl: pe.NG_APP_FRONTEND_URL || we.NG_APP_FRONTEND_URL || '',
      wsUrl: pe.NG_APP_WS_URL || we.NG_APP_WS_URL || '',
      nodeEnv: pe.NG_APP_NODE_ENV || we.NG_APP_NODE_ENV || 'development',
      telemetryDisabled: parseBool(pe.NG_APP_NEXT_TELEMETRY_DISABLED ?? we.NG_APP_NEXT_TELEMETRY_DISABLED, true),
      enableSourceMaps: parseBool(pe.NG_APP_ENABLE_SOURCE_MAPS ?? we.NG_APP_ENABLE_SOURCE_MAPS, true),
      port: parseNumber(pe.NG_APP_PORT ?? we.NG_APP_PORT, 3000),
      trustProxy: parseBool(pe.NG_APP_TRUST_PROXY ?? we.NG_APP_TRUST_PROXY, false),
      logLevel: pe.NG_APP_LOG_LEVEL || we.NG_APP_LOG_LEVEL || 'info',
      healthcheckPath: pe.NG_APP_HEALTHCHECK_PATH || we.NG_APP_HEALTHCHECK_PATH || '/health',
      featureFlags: parseFlags(pe.NG_APP_FEATURE_FLAGS ?? we.NG_APP_FEATURE_FLAGS),
      experimentsEnabled: parseBool(pe.NG_APP_EXPERIMENTS_ENABLED ?? we.NG_APP_EXPERIMENTS_ENABLED, false),
    };
  }

  // PUBLIC_INTERFACE
  get value(): AppEnvironment {
    return this.env;
  }

  // PUBLIC_INTERFACE
  isMock(): boolean {
    return (this.env.nodeEnv || 'development').toLowerCase() !== 'production';
  }
}
