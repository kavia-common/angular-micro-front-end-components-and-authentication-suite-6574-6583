import { Component, inject } from '@angular/core';
import { UiModule } from '../../shared/ui/ui.module';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [UiModule],
  template: `
    <div style="max-width:420px; margin: 32px auto;">
      <app-card title="Forgot Password" ariaLabel="Forgot password form">
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
          <app-form-field label="Email" [forId]="'email'">
            <input id="email" type="email" placeholder="you@example.com" aria-label="Email" formControlName="email" />
          </app-form-field>

          <div style="display:flex; align-items:center; justify-content:flex-end; margin-top: 12px;">
            <app-button [disabled]="loading" variant="primary" ariaLabel="Request reset">
              <span *ngIf="!loading">Request reset</span>
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
