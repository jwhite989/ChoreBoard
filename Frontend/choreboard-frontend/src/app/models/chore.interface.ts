import { User } from './user.interface';

export interface Chore {
  id: number;
  title: string;
  description: string;
  points: number;
  status: string;
  assignedTo: User | null;
}