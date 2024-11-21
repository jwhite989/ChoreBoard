import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.interface';

interface LoginResponse {
  id: number;
  username: string;
  role: string;
  points: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://choreboard-api-bkdwhadhf8b8fafa.eastus-01.azurewebsites.net/api/users';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const authData = btoa(`${username}:${password}`);
    console.log('Login - Auth Data:', authData);
    
    // Create initial user object
    const user = { username, authData };
    
    console.log('Login Request Details:', {
      url: `${this.apiUrl}/login`,
      body: { username, password },
      authHeader: `Basic ${authData}`
    });
    
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`, 
      { username, password }
    ).pipe(
      tap((response: LoginResponse) => {
        const fullUser = { ...user, ...response };
        console.log('Login successful - Storing user data:', fullUser);
        localStorage.setItem('currentUser', JSON.stringify(fullUser));
        this.currentUserSubject.next(fullUser);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('currentUser');
    console.log('Getting current user from storage:', userStr);
    return userStr ? JSON.parse(userStr) : null;
  }

  updateCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
