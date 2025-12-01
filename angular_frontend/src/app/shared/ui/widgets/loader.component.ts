import { Component, Input } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * Simple spinner loader.
 */
@Component({
  selector: 'app-loader',
  standalone: false,
  template: `
    <div class="loader" [attr.aria-label]="ariaLabel"></div>
  `
})
export class LoaderComponent {
  @Input() ariaLabel = 'Loading';
}
