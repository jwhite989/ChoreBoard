import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ChoreListComponent } from './components/chore-list/chore-list.component';
import { RewardListComponent } from './components/reward-list/reward-list.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { ReportsComponent } from './components/reports/reports.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { 
    path: 'users', 
    component: UserListComponent, 
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: 'chores', component: ChoreListComponent, canActivate: [AuthGuard] },
  { path: 'rewards', component: RewardListComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] }
];
