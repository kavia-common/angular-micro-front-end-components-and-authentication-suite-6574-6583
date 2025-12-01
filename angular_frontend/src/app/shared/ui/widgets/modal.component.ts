import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * Basic accessible modal dialog.
 */
@Component({
  selector: 'app-modal',
  standalone: false,
  template: `
    <div *ngIf="open" class="modal-backdrop" (click)="close()"></div>
    <div *ngIf="open" class="modal-content card" role="dialog" [attr.aria-labelledby]="titleId" aria-modal="true">
      <header style="display:flex; justify-content:space-between; align-items:center; padding:16px; border-bottom:1px solid #eef2f7;">
        <h3 [id]="titleId" style="margin:0;">{{ title }}</h3>
        <button class="btn btn-ghost" aria-label="Close modal" (click)="close()">✕</button>
      </header>
      <div style="padding:16px;">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.35);
      z-index: 99;
    }
    .modal-content {
      position: fixed;
      inset: 0;
      margin: auto;
      max-width: 560px;
      max-height: 80vh;
      overflow: auto;
      z-index: 100;
    }
  `]
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() titleId = 'modal-title';
  @Output() openChange = new EventEmitter<boolean>();

  close() {
    this.openChange.emit(false);
  }
}
