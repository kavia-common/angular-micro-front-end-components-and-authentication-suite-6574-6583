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
    <div style="max-width:420px; margin: 32px auto;">
      <app-card title="Sign in" ariaLabel="Login form">
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
          <app-form-field label="Email" [forId]="'email'">
            <input id="email" type="email" placeholder="you@example.com" aria-label="Email" formControlName="email" />
          </app-form-field>

          <app-form-field label="Password" [forId]="'password'">
            <input id="password" type="password" placeholder="••••••••" aria-label="Password" formControlName="password" />
          </app-form-field>

          <div style="display:flex; align-items:center; justify-content:space-between; margin-top: 12px;">
            <a routerLink="/forgot-password">Forgot password?</a>
            <app-button [disabled]="loading" variant="primary" ariaLabel="Sign in">
              <span *ngIf="!loading">Sign in</span>
              <app-loader *ngIf="loading"></app-loader>
            </app-button>
          </div>
        </form>

        <app-alert *ngIf="error" type="error" style="margin-top:12px;">{{ error }}</app-alert>
      </app-card>
    </div>
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
}
