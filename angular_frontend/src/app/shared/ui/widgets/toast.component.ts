import { Component, Input } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * Toast component pinned to bottom-right.
 */
@Component({
  selector: 'app-toast',
  standalone: false,
  template: `
    <div class="toast" *ngIf="message">
      <div class="alert" [ngClass]="alertCls">
        {{ message }}
      </div>
    </div>
  `
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() type: 'info' | 'success' | 'error' = 'info';

  get alertCls() {
    return {
      'alert-info': this.type === 'info',
      'alert-success': this.type === 'success',
      'alert-error': this.type === 'error',
    };
  }
}
