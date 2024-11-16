import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ChoreService } from '../../services/chore.service';
import { RewardService } from '../../services/reward.service';
import { User } from '../../models/user.interface';
import { Chore } from '../../models/chore.interface';
import { Report } from '../../models/report.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  users: User[] = [];
  chores: Chore[] = [];
  currentUser: User | null = null;
  private userSubscription?: Subscription;

  constructor(
    private userService: UserService,
    private choreService: ChoreService,
    private authService: AuthService,
    private router: Router,
    private rewardService: RewardService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
      if (user) {
        this.loadDashboardData();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  loadDashboardData(): void {
    if (this.currentUser?.role === 'CHILD') {
      // If user is a child, only show their own data
      this.users = [this.currentUser];
    } else {
      // If user is a parent or admin, show all users
      this.userService.getAllUsers().subscribe({
        next: (users: User[]) => this.users = users,
        error: (error: HttpErrorResponse) => {
          if (error.status !== 401) {
            console.error('Error loading users:', error);
          }
        }
      });
    }

    this.choreService.getAllChores().subscribe({
      next: (chores: Chore[]) => this.chores = chores,
      error: (error: HttpErrorResponse) => {
        console.error('Error loading chores:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
