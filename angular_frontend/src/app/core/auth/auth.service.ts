import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, map } from 'rxjs';
import { EnvironmentService } from '../config/environment';
import { LoginRequest, LoginResponse, MfaVerifyRequest, PasswordResetConfirmRequest, PasswordResetRequest, UserProfile } from './auth.models';

/**
 * PUBLIC_INTERFACE
 * AuthService provides authentication flows and state across the app.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private authState$ = new BehaviorSubject<boolean>(false);
  private profile$ = new BehaviorSubject<UserProfile | null>(null);
  private pendingMfaToken: string | null = null;

  constructor(private env: EnvironmentService) {}

  // PUBLIC_INTERFACE
  isAuthenticated$(): Observable<boolean> {
    return this.authState$.asObservable();
  }

  // PUBLIC_INTERFACE
  profile(): Observable<UserProfile | null> {
    return this.profile$.asObservable();
  }

  // PUBLIC_INTERFACE
  login(payload: LoginRequest): Observable<LoginResponse> {
    if (this.env.isMock()) {
      const requiresMfa = payload.email.toLowerCase().includes('mfa');
      const res: LoginResponse = {
        requiresMfa,
        mfaToken: requiresMfa ? 'mock-mfa-token' : undefined,
        accessToken: requiresMfa ? undefined : 'mock-access-token'
      };
      if (!requiresMfa) {
        this.authState$.next(true);
        this.profile$.next({ id: 'u1', email: payload.email, name: 'Mock User' });
      } else {
        this.pendingMfaToken = res.mfaToken || null;
      }
      return of(res).pipe(delay(500));
    }
    // In a real integration, use HttpClient with base URL from env.value.apiBase
    // Placeholder successful response:
    return of({ requiresMfa: false, accessToken: 'token' }).pipe(delay(500), map(r => {
      this.authState$.next(true);
      this.profile$.next({ id: 'u1', email: payload.email });
      return r;
    }));
  }

  // PUBLIC_INTERFACE
  requestMfa(email: string): Observable<{ mfaToken: string }> {
    if (this.env.isMock()) {
      this.pendingMfaToken = 'mock-mfa-token';
      return of({ mfaToken: 'mock-mfa-token' }).pipe(delay(400));
    }
    return of({ mfaToken: 'server-token' }).pipe(delay(400));
  }

  // PUBLIC_INTERFACE
  verifyMfa(payload: MfaVerifyRequest): Observable<{ accessToken: string }> {
    if (this.env.isMock()) {
      const ok = payload.code === '123456' && (!!this.pendingMfaToken && payload.mfaToken === this.pendingMfaToken);
      if (ok) {
        this.authState$.next(true);
        this.profile$.next({ id: 'u1', email: 'mock@example.com', name: 'Mock User' });
        this.pendingMfaToken = null;
        return of({ accessToken: 'mock-access-token' }).pipe(delay(400));
      }
      return of({ accessToken: '' }).pipe(delay(400));
    }
    return of({ accessToken: 'server-access-token' }).pipe(delay(400));
  }

  // PUBLIC_INTERFACE
  requestPasswordReset(payload: PasswordResetRequest): Observable<{ ok: boolean }> {
    if (this.env.isMock()) {
      return of({ ok: true }).pipe(delay(500));
    }
    return of({ ok: true }).pipe(delay(500));
  }

  // PUBLIC_INTERFACE
  resetPassword(payload: PasswordResetConfirmRequest): Observable<{ ok: boolean }> {
    if (this.env.isMock()) {
      return of({ ok: true }).pipe(delay(500));
    }
    return of({ ok: true }).pipe(delay(500));
  }

  // PUBLIC_INTERFACE
  logout() {
    this.authState$.next(false);
    this.profile$.next(null);
  }
}
