import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ClockingComponent } from '@modules/auth/containers/clocking/clocking.component';

export const containers = [LoginComponent, ClockingComponent, ForgotPasswordComponent];

export * from './login/login.component';
export * from '@modules/auth/containers/clocking/clocking.component';
export * from './forgot-password/forgot-password.component';
