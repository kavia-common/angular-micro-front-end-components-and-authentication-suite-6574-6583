import { Component, Input } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * Basic input wrapper for styling consistency.
 */
@Component({
  selector: 'app-input',
  standalone: false,
  template: `
    <input
      class="input"
      [type]="type"
      [attr.placeholder]="placeholder"
      [attr.aria-label]="ariaLabel"
      [disabled]="disabled"
      [ngModel]="value"
      (ngModelChange)="value = $event"
    />
  `
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() placeholder?: string;
  @Input() ariaLabel?: string;
  @Input() value: string | number | null = null;
  @Input() disabled = false;
}
