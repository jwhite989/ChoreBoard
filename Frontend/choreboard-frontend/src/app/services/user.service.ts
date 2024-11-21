import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { RegistrationRequest } from '../models/registration.interface';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Chore } from '../models/chore.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://choreboard-api-bkdwhadhf8b8fafa.eastus-01.azurewebsites.net/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  registerUser(registration: RegistrationRequest): Observable<User> {
    console.log('Sending registration request:', registration);
    return this.http.post<User>(`${this.apiUrl}/register`, registration)
      .pipe(
        tap((response: User) => console.log('Registration successful:', response)),
        catchError((error: HttpErrorResponse) => {
          console.error('Registration error:', error);
          return throwError(() => error);
        })
      );
  }

  searchUsers(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search`, {
      params: { username }
    });
  }

  getUserPoints(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${id}/points`);
  }

  getUserReport(id: number, startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/report`, {
      params: { startDate, endDate }
    });
  }

  completeChore(id: number): Observable<Chore> {
    return this.http.put<Chore>(`${this.apiUrl}/chores/${id}/complete`, {});
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/username/${username}`);
  }
}
