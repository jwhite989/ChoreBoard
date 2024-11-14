import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ChoreService } from '../../services/chore.service';
import { User } from '../../models/user.interface';
import { Chore } from '../../models/chore.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private userService: UserService,
    private choreService: ChoreService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    window.onbeforeunload = () => {
      this.authService.logout();
    };
  }

  ngOnDestroy(): void {
    window.onbeforeunload = null;
  }

  loadDashboardData(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => this.users = users);
    this.choreService.getAllChores().subscribe((chores: Chore[]) => this.chores = chores);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
