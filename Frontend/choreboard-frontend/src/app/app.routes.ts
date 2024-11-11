import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ChoreListComponent } from './components/chore-list/chore-list.component';
import { RewardListComponent } from './components/reward-list/reward-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UserListComponent },
  { path: 'chores', component: ChoreListComponent },
  { path: 'rewards', component: RewardListComponent }
];
