import { Component, Input } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * FormField provides label and error slots for inputs.
 */
@Component({
  selector: 'app-form-field',
  standalone: false,
  template: `
    <div class="form-field">
      <label *ngIf="label" [for]="forId">{{ label }}</label>
      <ng-content></ng-content>
      <small *ngIf="hint && !error" style="color:#6b7280;">{{ hint }}</small>
      <small *ngIf="error" style="color: var(--color-error);">{{ error }}</small>
    </div>
  `
})
export class FormFieldComponent {
  @Input() label?: string;
  @Input() forId?: string;
  @Input() hint?: string;
  @Input() error?: string;
}
