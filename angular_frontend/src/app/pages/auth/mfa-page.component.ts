import { Component, inject } from '@angular/core';
import { UiModule } from '../../shared/ui/ui.module';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-mfa-page',
  standalone: true,
  imports: [UiModule],
  template: `
    <main class="auth-shell" aria-label="MFA">
      <section class="panel panel--left" aria-label="Welcome information">
        <div class="left-content">
          <div class="brand">dish</div>
          <h1>Secure verification</h1>
          <p class="subcopy">Enter the 6-digit verification code to continue.</p>
          <ul class="meta"><li>Time-based codes</li><li>Best practices</li></ul>
        </div>
      </section>

      <section class="panel panel--right" aria-label="MFA verification panel">
        <div class="gradient-bg" aria-hidden="true"></div>

        <div class="login-card" aria-label="MFA card">
          <h2>Verify MFA</h2>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <app-form-field label="Code" [forId]="'code'" hint="Use 123456 in mock mode">
              <div class="input">
                <input id="code" type="text" inputmode="numeric" placeholder="123456" aria-label="MFA code" formControlName="code" />
              </div>
            </app-form-field>

            <div class="form-actions" style="justify-content: flex-end;">
              <button class="btn btn--primary" [disabled]="loading" aria-label="Verify" type="submit">
                <span *ngIf="!loading">Verify</span>
                <app-loader *ngIf="loading"></app-loader>
              </button>
            </div>
          </form>

          <app-alert *ngIf="error" type="error">{{ error }}</app-alert>
        </div>
      </section>
    </main>
  `
})
export class MfaPageComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error = '';
  token = this.route.snapshot.queryParamMap.get('token') || '';

  form = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    this.error = '';
    if (this.form.invalid || !this.token) {
      this.error = 'Enter a valid code.';
      return;
    }
    this.loading = true;
    const { code } = this.form.value;
    this.auth.verifyMfa({ mfaToken: this.token, code: code! }).subscribe(res => {
      this.loading = false;
      if (res.accessToken) {
        this.router.navigate(['/']);
      } else {
        this.error = 'Invalid code.';
      }
    });
  }
}
