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
    <div style="max-width:420px; margin: 32px auto;">
      <app-card title="Verify MFA" ariaLabel="MFA verification form">
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
          <app-form-field label="Code" [forId]="'code'" hint="Use 123456 in mock mode">
            <input id="code" type="text" placeholder="123456" aria-label="MFA code" formControlName="code" />
          </app-form-field>

          <div style="display:flex; align-items:center; justify-content:flex-end; margin-top: 12px;">
            <app-button [disabled]="loading" variant="primary" ariaLabel="Verify">
              <span *ngIf="!loading">Verify</span>
              <app-loader *ngIf="loading"></app-loader>
            </app-button>
          </div>
        </form>

        <app-alert *ngIf="error" type="error" style="margin-top:12px;">{{ error }}</app-alert>
      </app-card>
    </div>
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
