import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RewardService } from '../../services/reward.service';
import { UserService } from '../../services/user.service';
import { Reward } from '../../models/reward.interface';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-reward-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reward-list.component.html',
  styleUrl: './reward-list.component.css'
})
export class RewardListComponent implements OnInit {
  rewards: Reward[] = [];
  users: User[] = [];
  selectedUser: User | null = null;
  editingReward: Reward | null = null;
  newReward: Reward = {
    id: 0,
    title: '',
    description: '',
    pointsCost: 0
  };

  constructor(
    private rewardService: RewardService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadRewards();
    this.loadUsers();
  }

  loadRewards(): void {
    this.rewardService.getAllRewards().subscribe((rewards: Reward[]) => this.rewards = rewards);
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => this.users = users);
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  canAffordReward(reward: Reward): boolean {
    return this.selectedUser ? this.selectedUser.points >= reward.pointsCost : false;
  }

  redeemReward(reward: Reward): void {
    if (this.selectedUser && this.canAffordReward(reward)) {
      this.selectedUser.points -= reward.pointsCost;
      this.userService.updateUser(this.selectedUser).subscribe(() => {
        this.loadUsers();
        // Reset selected user to refresh points
        this.selectedUser = this.users.find(u => u.id === this.selectedUser?.id) || null;
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
        title: '',
        description: '',
        pointsCost: 0
      };
    });
  }

  deleteReward(id: number): void {
    this.rewardService.deleteReward(id).subscribe(() => {
      this.loadRewards();
    });
  }
}
