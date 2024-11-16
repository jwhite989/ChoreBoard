import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reward } from '../models/reward.interface';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Redemption } from '../models/redemption.interface';

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

  getRewardReport(startDate?: string, endDate?: string): Observable<any> {
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    return this.http.get<any>(`${this.apiUrl}/report`, { params });
  }

  redeemReward(rewardId: number, userId: number): Observable<void> {
    console.log(`Attempting to redeem reward ${rewardId} for user ${userId}`);
    return this.http.post<void>(`${this.apiUrl}/${rewardId}/redeem`, null, {
      params: { userId: userId.toString() }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error in reward service:', error);
        return throwError(() => error);
      })
    );
  }

  updateReward(reward: Reward): Observable<Reward> {
    return this.http.put<Reward>(`${this.apiUrl}/${reward.id}`, reward);
  }

  getRedemptions(userId?: number): Observable<Redemption[]> {
    let params = new HttpParams();
    if (userId) params = params.set('userId', userId.toString());
    return this.http.get<Redemption[]>(`${this.apiUrl}/redemptions`, { params });
  }
}
