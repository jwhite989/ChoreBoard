export interface Redemption {
    id: number;
    userId: number;
    rewardId: number;
    redeemedAt: string;
    description?: string;
    reward?: {
        name: string;
        pointsRequired: number;
    };
} 