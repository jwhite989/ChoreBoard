import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chore } from '../models/chore.interface';

@Injectable({
  providedIn: 'root'
})
export class ChoreService {
  private apiUrl = 'http://localhost:8080/api/chores';

  constructor(private http: HttpClient) {}

  getAllChores(): Observable<Chore[]> {
    return this.http.get<Chore[]>(this.apiUrl);
  }

  getChoreById(id: number): Observable<Chore> {
    return this.http.get<Chore>(`${this.apiUrl}/${id}`);
  }

  createChore(chore: Chore): Observable<Chore> {
    return this.http.post<Chore>(this.apiUrl, chore);
  }

  deleteChore(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchChores(status: string): Observable<Chore[]> {
    return this.http.get<Chore[]>(`${this.apiUrl}/search?status=${status}`);
  }

  completeChore(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/complete`, {});
  }
}
