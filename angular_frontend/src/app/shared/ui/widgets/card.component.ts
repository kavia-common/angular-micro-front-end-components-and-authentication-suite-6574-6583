import { Component, Input } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * Card container with padding and header slot.
 */
@Component({
  selector: 'app-card',
  standalone: false,
  template: `
    <section class="card" [attr.aria-label]="ariaLabel">
      <header *ngIf="title" style="padding: 16px; border-bottom: 1px solid #eef2f7;">
        <h2 style="margin:0; font-size:1.1rem;">{{ title }}</h2>
      </header>
      <div [style.padding.px]="padding">
        <ng-content></ng-content>
      </div>
    </section>
  `
})
export class CardComponent {
  @Input() title?: string;
  @Input() ariaLabel?: string;
  @Input() padding = 16;
}
