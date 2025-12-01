import { Component, inject } from '@angular/core';
import { UiModule } from '../../shared/ui/ui.module';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [UiModule],
  template: `
    <main class="auth-shell" aria-label="Authentication">
      <section class="panel panel--left" aria-label="Welcome information">
        <div class="left-content">
          <div class="brand" aria-label="Brand">dish</div>
          <h1>Welcome to your SBB Management Portal</h1>
          <p class="subcopy">
            Manage and monitor millions of CPDs intelligently to improve operational efficiency and enhance customer experience
          </p>
          <ul class="meta" aria-label="Highlights">
            <li>ISO</li>
            <li>Enterprise-grade</li>
            <li>24/7 Monitoring</li>
          </ul>
        </div>
      </section>

      <section class="panel panel--right" aria-label="Login panel">
        <div class="gradient-bg" aria-hidden="true"></div>

        <div class="login-card" aria-label="Login form card">
          <h2>Login</h2>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <app-form-field label="Email / Username" [forId]="'email'">
              <div class="input">
                <input
                  id="email"
                  type="email"
                  autocomplete="username"
                  placeholder="you@example.com"
                  aria-label="Email or username"
                  formControlName="email"
                />
              </div>
            </app-form-field>

            <app-form-field label="Password" [forId]="'password'">
              <div class="input">
                <input
                  id="password"
                  type="password"
                  autocomplete="current-password"
                  placeholder="••••••••"
                  aria-label="Password"
                  formControlName="password"
                />
              </div>
            </app-form-field>

            <div class="form-actions">
              <a class="link--muted" routerLink="/forgot-password">Forgot password?</a>
              <button class="btn btn--primary" [disabled]="loading" aria-label="Sign in" type="submit">
                <span *ngIf="!loading">Sign in</span>
                <app-loader *ngIf="loading"></app-loader>
              </button>
            </div>
          </form>

          <app-alert *ngIf="error" type="error">{{ error }}</app-alert>

          <button class="btn btn--secondary btn--block" type="button" aria-label="Register (placeholder)" (click)="onRegister()">
            Register
          </button>
        </div>
      </section>
    </main>
  `
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    this.error = '';
    if (this.form.invalid) {
      this.error = 'Please enter a valid email and password.';
      return;
    }
    this.loading = true;
    const { email, password } = this.form.value;
    this.auth.login({ email: email!, password: password! }).subscribe(res => {
      this.loading = false;
      if (res.requiresMfa && res.mfaToken) {
        this.router.navigate(['/mfa'], { queryParams: { token: res.mfaToken } });
      } else if (res.accessToken) {
        this.router.navigate(['/']);
      } else {
        this.error = 'Login failed.';
      }
    });
  }

  // PUBLIC_INTERFACE
  onRegister() {
    /** Placeholder for future registration route; keeps layout parity with design. */
    // Could navigate to /register when implemented
  }
}
