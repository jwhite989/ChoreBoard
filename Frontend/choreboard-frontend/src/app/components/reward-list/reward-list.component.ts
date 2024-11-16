import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RewardService } from '../../services/reward.service';
import { UserService } from '../../services/user.service';
import { Reward } from '../../models/reward.interface';
import { User } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Redemption } from '../../models/redemption.interface';



@Component({
  selector: 'app-reward-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reward-list.component.html',
  styleUrl: './reward-list.component.css'
})
export class RewardListComponent implements OnInit {
  rewards: Reward[] = [];
  currentUser: User | null = null;
  editingReward: Reward | null = null;
  newReward: Reward = {
    id: 0,
    name: '',
    description: '',
    pointsRequired: 0
  };
  console = console;
  redemptions: Redemption[] = [];

  constructor(
    private rewardService: RewardService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRewards();
    this.loadCurrentUser();
    this.loadRedemptions();
  }

  loadRewards(): void {
    this.rewardService.getAllRewards().subscribe((rewards: Reward[]) => this.rewards = rewards);
  }

  loadCurrentUser(): void {
    console.log('Loading current user...');
    this.authService.currentUser$.subscribe((user: User | null) => {
      console.log('Current user loaded:', user);
      this.currentUser = user;
    });
  }

  loadRedemptions(): void {
    if (this.currentUser) {
      const userId = this.currentUser.role === 'CHILD' ? this.currentUser.id : undefined;
      this.rewardService.getRedemptions(userId).subscribe({
        next: (redemptions: Redemption[]) => {
          this.redemptions = redemptions;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error loading redemptions:', error);
        }
      });
    }
  }

  redeemReward(reward: Reward): void {
    console.log('Redeem button clicked');
    console.log('Current user:', this.currentUser);
    console.log('Reward:', reward);

    if (!this.currentUser) {
      alert('Please log in to redeem rewards');
      return;
    }

    if (this.currentUser.points < reward.pointsRequired) {
      alert(`You need ${reward.pointsRequired} points to redeem this reward. You currently have ${this.currentUser.points} points.`);
      return;
    }

    this.rewardService.redeemReward(reward.id, this.currentUser.id).subscribe({
      next: () => {
        console.log('Reward redeemed successfully');
        this.loadCurrentUser();
        this.loadRedemptions();
        alert('Reward redeemed successfully!');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error redeeming reward:', error);
        alert('Failed to redeem reward: ' + error.message);
      }
    });
  }

  startEditing(reward: Reward): void {
    this.editingReward = { ...reward };
  }

  updateReward(): void {
    if (this.editingReward) {
      this.rewardService.updateReward(this.editingReward).subscribe(() => {
        this.loadRewards();
        this.editingReward = null;
      });
    }
  }

  cancelEditing(): void {
    this.editingReward = null;
  }

  createReward(): void {
    this.rewardService.createReward(this.newReward).subscribe(() => {
      this.loadRewards();
      this.newReward = {
        id: 0,
        name: '',
        description: '',
        pointsRequired: 0
      };
    });
  }

  deleteReward(id: number): void {
    this.rewardService.deleteReward(id).subscribe(() => {
      this.loadRewards();
    });
  }
}
