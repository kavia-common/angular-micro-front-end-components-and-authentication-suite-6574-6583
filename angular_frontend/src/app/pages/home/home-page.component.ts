import { Component, inject } from '@angular/core';
import { UiModule } from '../../shared/ui/ui.module';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [UiModule],
  template: `
    <app-card title="Welcome" ariaLabel="Welcome card">
      <p>You're authenticated. This is the protected home page.</p>
      <div style="margin-top:16px;">
        <app-button (click)="logout()">Logout</app-button>
      </div>
    </app-card>
  `
})
export class HomePageComponent {
  private auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}
