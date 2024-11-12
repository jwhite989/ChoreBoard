import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reward } from '../models/reward.interface';

@Injectable({
  providedIn: 'root'
})
export class RewardService {
  private apiUrl = 'api/rewards';

  constructor(private http: HttpClient) {}

  getAllRewards(): Observable<Reward[]> {
    return this.http.get<Reward[]>(this.apiUrl);
  }

  createReward(reward: Reward): Observable<Reward> {
    return this.http.post<Reward>(this.apiUrl, reward);
  }

  updateReward(reward: Reward): Observable<Reward> {
    return this.http.put<Reward>(`${this.apiUrl}/${reward.id}`, reward);
  }

  deleteReward(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
