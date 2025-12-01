import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { LoginPageComponent } from './pages/auth/login-page.component';
import { MfaPageComponent } from './pages/auth/mfa-page.component';
import { ForgotPasswordPageComponent } from './pages/auth/forgot-password-page.component';
import { ResetPasswordPageComponent } from './pages/auth/reset-password-page.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent, canActivate: [AuthGuard], title: 'Home' },
  { path: 'login', component: LoginPageComponent, title: 'Login' },
  { path: 'mfa', component: MfaPageComponent, title: 'MFA Verification' },
  { path: 'forgot-password', component: ForgotPasswordPageComponent, title: 'Forgot Password' },
  { path: 'reset-password', component: ResetPasswordPageComponent, title: 'Reset Password' },
  { path: '**', redirectTo: '' }
];
