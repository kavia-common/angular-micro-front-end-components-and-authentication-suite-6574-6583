import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  template: `
    <nav class="card" style="display:flex; align-items:center; justify-content:space-between; padding: 0 16px; height:64px;">
      <div style="display:flex; align-items:center; gap:12px;">
        <ng-content select="[left]"></ng-content>
      </div>
      <div style="display:flex; align-items:center; gap:12px;">
        <strong>{{ title }}</strong>
        <ng-content select="[right]"></ng-content>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  @Input() title = 'App';
}
