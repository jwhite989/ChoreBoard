import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reward } from '../models/reward.interface';

@Injectable({
  providedIn: 'root'
})
export class RewardService {
  private apiUrl = 'http://localhost:8080/api/rewards';

  constructor(private http: HttpClient) {}

  getAllRewards(): Observable<Reward[]> {
    return this.http.get<Reward[]>(this.apiUrl);
  }

  getRewardById(id: number): Observable<Reward> {
    return this.http.get<Reward>(`${this.apiUrl}/${id}`);
  }

  createReward(reward: Reward): Observable<Reward> {
    return this.http.post<Reward>(this.apiUrl, reward);
  }

  deleteReward(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
