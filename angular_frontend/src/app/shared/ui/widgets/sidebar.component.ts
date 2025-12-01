import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  template: `
    <aside class="card" style="height:100%; padding:16px;">
      <ng-content></ng-content>
    </aside>
  `
})
export class SidebarComponent {}
