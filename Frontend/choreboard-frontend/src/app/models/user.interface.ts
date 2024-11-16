export interface User {
    id: number;
    username: string;
    password: string;
    points: number;
    email?: string;
    role: string;
    authData?: string;
    createdAt?: Date;
  }