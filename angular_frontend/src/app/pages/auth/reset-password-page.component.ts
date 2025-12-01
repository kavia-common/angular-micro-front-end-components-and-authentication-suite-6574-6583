import { Component, inject } from '@angular/core';
import { UiModule } from '../../shared/ui/ui.module';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [UiModule],
  template: `
    <main class="auth-shell" aria-label="Reset password">
      <section class="panel panel--left" aria-label="Reset info">
        <div class="left-content">
          <div class="brand">dish</div>
          <h1>Set a new password</h1>
          <p class="subcopy">Choose a strong password to keep your account secure.</p>
          <ul class="meta"><li>Min 8 characters</li><li>Use symbols and numbers</li></ul>
        </div>
      </section>

      <section class="panel panel--right" aria-label="Reset form panel">
        <div class="gradient-bg" aria-hidden="true"></div>

        <div class="login-card" aria-label="Reset password card">
          <h2>Reset Password</h2>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <app-form-field label="New Password" [forId]="'password'">
              <div class="input">
                <input id="password" type="password" autocomplete="new-password" placeholder="New password" aria-label="New password" formControlName="password" />
              </div>
            </app-form-field>

            <div class="form-actions" style="justify-content: flex-end;">
              <button class="btn btn--primary" [disabled]="loading" aria-label="Reset password" type="submit">
                <span *ngIf="!loading">Reset</span>
                <app-loader *ngIf="loading"></app-loader>
              </button>
            </div>
          </form>

          <app-alert *ngIf="message" type="success">{{ message }}</app-alert>
          <app-alert *ngIf="error" type="error">{{ error }}</app-alert>
        </div>
      </section>
    </main>
  `
})
export class ResetPasswordPageComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);

  token = this.route.snapshot.queryParamMap.get('token') || '';
  loading = false;
  error = '';
  message = '';

  form = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    this.error = '';
    this.message = '';
    if (this.form.invalid || !this.token) {
      this.error = 'Enter a valid password.';
      return;
    }
    this.loading = true;
    const { password } = this.form.value;
    this.auth.resetPassword({ token: this.token, newPassword: password! }).subscribe(res => {
      this.loading = false;
      if (res.ok) {
        this.message = 'Password changed. You can now sign in.';
        const g: any = (typeof globalThis !== 'undefined') ? globalThis : {};
        if (g && typeof g.setTimeout === 'function') {
          g.setTimeout(() => this.router.navigate(['/login']), 1000);
        }
      } else {
        this.error = 'Reset failed.';
      }
    });
  }
}
