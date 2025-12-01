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
    <div style="max-width:420px; margin: 32px auto;">
      <app-card title="Reset Password" ariaLabel="Reset password form">
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
          <app-form-field label="New Password" [forId]="'password'">
            <input id="password" type="password" placeholder="New password" aria-label="New password" formControlName="password" />
          </app-form-field>

          <div style="display:flex; align-items:center; justify-content:flex-end; margin-top: 12px;">
            <app-button [disabled]="loading" variant="primary" ariaLabel="Reset password" type="submit">
              <span *ngIf="!loading">Reset</span>
              <app-loader *ngIf="loading"></app-loader>
            </app-button>
          </div>
        </form>

        <app-alert *ngIf="message" type="success" style="margin-top:12px;">{{ message }}</app-alert>
        <app-alert *ngIf="error" type="error" style="margin-top:12px;">{{ error }}</app-alert>
      </app-card>
    </div>
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
