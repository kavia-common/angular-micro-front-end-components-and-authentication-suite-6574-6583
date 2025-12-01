import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

/**
 * PUBLIC_INTERFACE
 * AuthGuard redirects unauthenticated users to login.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    return this.auth.isAuthenticated$().pipe(
      take(1),
      map(ok => {
        if (!ok) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
