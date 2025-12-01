import { Component, Input } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * Alert banner for info/success/error states.
 */
@Component({
  selector: 'app-alert',
  standalone: false,
  template: `
    <div class="alert" [ngClass]="cls" role="status" aria-live="polite">
      <ng-content></ng-content>
    </div>
  `
})
export class AlertComponent {
  @Input() type: 'info' | 'success' | 'error' = 'info';

  get cls() {
    return {
      'alert-info': this.type === 'info',
      'alert-success': this.type === 'success',
      'alert-error': this.type === 'error',
    };
  }
}
