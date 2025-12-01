import { Component, Input } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * Accessible button with variants.
 */
@Component({
  selector: 'app-button',
  standalone: false,
  template: `
    <button class="btn" [ngClass]="variantClass" [attr.aria-label]="ariaLabel" [disabled]="disabled" type="button">
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() disabled = false;
  @Input() ariaLabel?: string;

  get variantClass() {
    return {
      'btn-primary': this.variant === 'primary',
      'btn-secondary': this.variant === 'secondary',
      'btn-ghost': this.variant === 'ghost',
    };
  }
}
