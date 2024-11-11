import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ChoreService } from '../../services/chore.service';
import { User } from '../../models/user.interface';
import { Chore } from '../../models/chore.interface';

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
    private choreService: ChoreService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => this.users = users);
    this.choreService.getAllChores().subscribe((chores: Chore[]) => this.chores = chores);
  }
}
