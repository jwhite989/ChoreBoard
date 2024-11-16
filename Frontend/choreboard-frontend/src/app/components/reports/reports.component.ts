import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RewardService } from '../../services/reward.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.interface';
import { ChildReport } from '../../models/child-report.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  currentUser: User | null = null;
  searchUsername: string = '';
  childReport: ChildReport | null = null;
  errorMessage: string = '';

  constructor(
    private rewardService: RewardService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
    });
  }

  searchChildReport(): void {
    if (!this.searchUsername) {
      this.errorMessage = 'Please enter a username';
      return;
    }

    this.userService.getUserByUsername(this.searchUsername).subscribe({
      next: (user: User) => {
        if (user.role !== 'CHILD') {
          this.errorMessage = 'User is not a child';
          this.childReport = null;
          return;
        }
        this.loadChildReport(user.id);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error finding user:', error);
        this.errorMessage = 'User not found';
        this.childReport = null;
      }
    });
  }

  private loadChildReport(userId: number): void {
    this.rewardService.getChildReport(userId).subscribe({
      next: (report: ChildReport) => {
        this.childReport = report;
        this.errorMessage = '';
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading child report:', error);
        this.errorMessage = 'Error loading report';
        this.childReport = null;
      }
    });
  }
} 