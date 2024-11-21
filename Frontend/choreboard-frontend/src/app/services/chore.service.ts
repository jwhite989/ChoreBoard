import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chore } from '../models/chore.interface';

@Injectable({
  providedIn: 'root'
})
export class ChoreService {
  private apiUrl = 'https://choreboard-api-bkdwhadhf8b8fafa.eastus-01.azurewebsites.net/api/chores';

  constructor(private http: HttpClient) {}

  getAllChores(): Observable<Chore[]> {
    return this.http.get<Chore[]>(this.apiUrl);
  }

  getChoresByUser(userId: number): Observable<Chore[]> {
    return this.http.get<Chore[]>(`${this.apiUrl}/user/${userId}`);
  }

  createChore(chore: Chore): Observable<Chore> {
    return this.http.post<Chore>(this.apiUrl, chore);
  }

  updateChore(chore: Chore): Observable<Chore> {
    return this.http.put<Chore>(`${this.apiUrl}/${chore.id}`, chore);
  }

  deleteChore(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  completeChore(id: number): Observable<Chore> {
    return this.http.put<Chore>(`${this.apiUrl}/${id}/complete`, {});
  }
}
