import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ChoreService } from '../../services/chore.service';
import { User } from '../../models/user.interface';
import { Chore } from '../../models/chore.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  chores: Chore[] = [];

  constructor(
    private userService: UserService,
    private choreService: ChoreService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }


  loadDashboardData(): void {
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => this.users = users,
      error: (error: HttpErrorResponse) => {
        if (error.status !== 401) {
          console.error('Error loading users:', error);
        }
      }
    });

    this.choreService.getAllChores().subscribe({
      next: (chores: Chore[]) => this.chores = chores,
      error: (error: HttpErrorResponse) => {
        if (error.status !== 401) {
          console.error('Error loading chores:', error);
        }
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
