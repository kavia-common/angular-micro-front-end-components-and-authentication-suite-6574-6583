import { Component, Input } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * Accessible button with variants.
 */
@Component({
  selector: 'app-button',
  standalone: false,
  template: `
    <button
      class="btn"
      [ngClass]="variantClass"
      [attr.aria-label]="ariaLabel"
      [disabled]="disabled"
      [attr.type]="type">
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() disabled = false;
  @Input() ariaLabel?: string;
  /**
   * Button type attribute. Use 'submit' when this button is inside a form to trigger (ngSubmit).
   * Defaults to 'button' to avoid accidental submissions when used outside forms.
   */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  get variantClass() {
    return {
      'btn-primary': this.variant === 'primary',
      'btn-secondary': this.variant === 'secondary',
      'btn-ghost': this.variant === 'ghost',
    };
  }
}
