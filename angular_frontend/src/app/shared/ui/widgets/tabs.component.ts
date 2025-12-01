import { Component, Input } from '@angular/core';

export interface TabItem {
  key: string;
  label: string;
}

/**
 * PUBLIC_INTERFACE
 * Lightweight tabs component.
 */
@Component({
  selector: 'app-tabs',
  standalone: false,
  template: `
    <div role="tablist" aria-label="Tabs" style="display:flex; gap:8px; border-bottom:1px solid #e5e7eb; margin-bottom:12px;">
      <button *ngFor="let t of items"
        class="btn btn-ghost"
        role="tab"
        [attr.aria-selected]="t.key === active"
        (click)="active = t.key">
        {{ t.label }}
      </button>
    </div>
    <ng-content></ng-content>
  `
})
export class TabsComponent {
  @Input() items: TabItem[] = [];
  @Input() active: string = '';
}
