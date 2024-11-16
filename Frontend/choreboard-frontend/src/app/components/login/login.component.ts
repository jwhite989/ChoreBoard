import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.authService.login(this.credentials.username, this.credentials.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Login error:', err);
          this.error = err.error?.message || 'Invalid username or password';
        }
      });
  }
}
