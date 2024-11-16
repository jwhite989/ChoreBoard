import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChoreService } from '../../services/chore.service';
import { UserService } from '../../services/user.service';
import { Chore } from '../../models/chore.interface';
import { User } from '../../models/user.interface';

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

  constructor(
    private choreService: ChoreService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadChores();
    this.loadUsers();
  }

  loadChores(): void {
    this.choreService.getAllChores().subscribe((chores: Chore[]) => {
      this.chores = chores;
      this.filterChores();
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => this.users = users);
  }

  filterChores(): void {
    if (this.statusFilter === 'ALL') {
      this.filteredChores = this.chores;
    } else {
      this.filteredChores = this.chores.filter(chore => chore.status === this.statusFilter);
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
    this.choreService.completeChore(id).subscribe(() => {
      this.loadChores();
    });
  }
}
