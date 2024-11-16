import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ChoreService } from '../../services/chore.service';
import { User } from '../../models/user.interface';
import { Chore } from '../../models/chore.interface';
import { RegistrationRequest } from '../../models/registration.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  userChores: { [key: number]: Chore[] } = {};
  newUser: RegistrationRequest = {
    username: '',
    password: '',
    email: '',
    role: 'CHILD' as 'ADMIN' | 'PARENT' | 'CHILD'
  };
  editingUser: User | null = null;
  successMessage: string = '';

  constructor(
    private userService: UserService,
    private choreService: ChoreService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      users.forEach(user => this.loadUserChores(user.id));
    });
  }

  loadUserChores(userId: number): void {
    this.choreService.getChoresByUser(userId).subscribe((chores: Chore[]) => {
      this.userChores[userId] = chores;
    });
  }

  createUser(): void {
    this.userService.registerUser(this.newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.newUser = {
          username: '',
          password: '',
          email: '',
          role: 'CHILD'
        };
        this.successMessage = 'User created successfully!';
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error creating user:', error);
      }
    });
  }

  startEditing(user: User): void {
    this.editingUser = { ...user };
  }

  updateUser(): void {
    if (this.editingUser) {
      this.userService.updateUser(this.editingUser).subscribe(() => {
        this.loadUsers();
        this.editingUser = null;
      });
    }
  }

  cancelEditing(): void {
    this.editingUser = null;
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}
