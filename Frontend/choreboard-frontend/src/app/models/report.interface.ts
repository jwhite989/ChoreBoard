import { Chore } from './chore.interface';
import { Reward } from './reward.interface';

export interface Report {
  chores?: Chore[];
  rewards?: Reward[];
  totalChores?: number;
  totalPoints?: number;
  totalRewards?: number;
  generatedAt: Date;
  title: string;
}
