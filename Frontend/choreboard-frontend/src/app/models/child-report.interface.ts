export interface ChildReport {
  username: string;
  completedChores: {
    name: string;
    title: string;
    description: string;
    completedDate: string;
    points: number;
  }[];
  currentPoints: number;
  redeemedRewards: {
    name: string;
    title: string;
    description: string;
    redeemedAt: string;
    pointsCost: number;
  }[];
  totalChoresCompleted: number;
  totalPointsEarned: number;
  totalRewardsRedeemed: number;
} 