export interface ChildReport {
  username: string;
  completedChores: {
    name: string;
    completedDate: string;
    points: number;
  }[];
  currentPoints: number;
  redeemedRewards: {
    name: string;
    redeemedAt: string;
    pointsCost: number;
  }[];
  totalChoresCompleted: number;
  totalPointsEarned: number;
  totalRewardsRedeemed: number;
} 