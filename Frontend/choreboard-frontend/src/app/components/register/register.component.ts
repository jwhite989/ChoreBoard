import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegistrationRequest } from '../../models/registration.interface';
import { User } from '../../models/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationRequest: RegistrationRequest = {
    username: '',
    password: '',
    email: ''
  };
  error: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    console.log('Register function called');
    console.log('Registration data:', this.registrationRequest);
    
    this.userService.registerUser(this.registrationRequest).subscribe({
      next: (response: User) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Registration failed:', error);
        this.error = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
