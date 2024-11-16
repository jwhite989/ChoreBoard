import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChoreService } from '../../services/chore.service';
import { UserService } from '../../services/user.service';
import { Chore } from '../../models/chore.interface';
import { User } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-chore-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chore-list.component.html',
  styleUrl: './chore-list.component.css'
})
export class ChoreListComponent implements OnInit {
  chores: Chore[] = [];
  filteredChores: Chore[] = [];
  users: User[] = [];
  statusFilter: string = 'ALL';
  editingChore: Chore | null = null;
  newChore: Chore = {
    id: 0,
    title: '',
    description: '',
    points: 0,
    status: 'PENDING',
    dueDate: '',
    assignedTo: null
  };
  currentUser: User | null = null;

  constructor(
    private choreService: ChoreService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadChores();
    this.loadUsers();
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
    });
  }

  loadChores(): void {
    this.choreService.getAllChores().subscribe({
      next: (chores: Chore[]) => {
        this.chores = chores;
        this.filterChores();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading chores:', error);
      }
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => this.users = users);
  }

  filterChores(): void {
    if (this.statusFilter === 'ALL') {
      this.filteredChores = this.chores.map(chore => ({
        ...chore,
        status: chore.completedDate ? 'COMPLETED' : chore.status
      }));
    } else {
      this.filteredChores = this.chores
        .map(chore => ({
          ...chore,
          status: chore.completedDate ? 'COMPLETED' : chore.status
        }))
        .filter(chore => chore.status === this.statusFilter);
    }
  }

  startEditing(chore: Chore): void {
    this.editingChore = { ...chore };
  }

  updateChore(): void {
    if (this.editingChore) {
      this.choreService.updateChore(this.editingChore).subscribe(() => {
        this.loadChores();
        this.editingChore = null;
      });
    }
  }

  cancelEditing(): void {
    this.editingChore = null;
  }

  createChore(): void {
    this.choreService.createChore(this.newChore).subscribe(() => {
      this.loadChores();
      this.newChore = {
        id: 0,
        title: '',
        description: '',
        points: 0,
        status: 'PENDING',
        dueDate: '',
        assignedTo: null
      };
    });
  }

  deleteChore(id: number): void {
    this.choreService.deleteChore(id).subscribe(() => {
      this.loadChores();
    });
  }

  completeChore(id: number): void {
    const chore = this.chores.find(c => c.id === id);
    if (chore && chore.status !== 'COMPLETED') {
      this.choreService.completeChore(id).subscribe({
        next: (response: Chore) => {
          const index = this.chores.findIndex(c => c.id === id);
          if (index !== -1) {
            this.chores[index] = {...response, status: 'COMPLETED'};
          }
          this.filterChores();
          this.loadChores();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error completing chore:', error);
        }
      });
    }
  }
}
