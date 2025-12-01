import { Component, inject } from '@angular/core';
import { UiModule } from '../../shared/ui/ui.module';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [UiModule],
  template: `
    <main class="auth-shell" aria-label="Forgot password">
      <section class="panel panel--left" aria-label="Support information">
        <div class="left-content">
          <div class="brand">dish</div>
          <h1>Need a password reset?</h1>
          <p class="subcopy">Enter your email and we'll send you a link to reset your password.</p>
          <ul class="meta"><li>Secure</li><li>Fast</li></ul>
        </div>
      </section>

      <section class="panel panel--right" aria-label="Reset request panel">
        <div class="gradient-bg" aria-hidden="true"></div>

        <div class="login-card" aria-label="Forgot password card">
          <h2>Forgot Password</h2>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <app-form-field label="Email" [forId]="'email'">
              <div class="input">
                <input id="email" type="email" autocomplete="email" placeholder="you@example.com" aria-label="Email" formControlName="email" />
              </div>
            </app-form-field>

            <div class="form-actions" style="justify-content: flex-end;">
              <button class="btn btn--primary" [disabled]="loading" aria-label="Request reset" type="submit">
                <span *ngIf="!loading">Request reset</span>
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
export class ForgotPasswordPageComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  loading = false;
  error = '';
  message = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    this.error = '';
    this.message = '';
    if (this.form.invalid) {
      this.error = 'Please enter a valid email.';
      return;
    }
    this.loading = true;
    const { email } = this.form.value;
    this.auth.requestPasswordReset({ email: email! }).subscribe(res => {
      this.loading = false;
      if (res.ok) {
        this.message = 'If the email exists, a reset link has been sent.';
      } else {
        this.error = 'Request failed.';
      }
    });
  }
}
