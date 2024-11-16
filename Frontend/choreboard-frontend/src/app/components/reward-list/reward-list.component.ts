import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RewardService } from '../../services/reward.service';
import { UserService } from '../../services/user.service';
import { Reward } from '../../models/reward.interface';
import { User } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';



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

  constructor(
    private rewardService: RewardService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRewards();
    this.loadCurrentUser();
  }

  loadRewards(): void {
    this.rewardService.getAllRewards().subscribe((rewards: Reward[]) => this.rewards = rewards);
  }

  loadCurrentUser(): void {
    this.authService.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  redeemReward(reward: Reward): void {
    if (this.currentUser && this.currentUser.points >= reward.pointsRequired) {
      this.rewardService.redeemReward(reward.id, this.currentUser.id).subscribe(() => {
        this.loadCurrentUser();
      });
    }
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
