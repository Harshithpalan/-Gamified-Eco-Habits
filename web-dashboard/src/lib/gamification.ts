/**
 * Gamification Engine
 * 
 * Handles the logic for points, streaks, and badges.
 */

export interface Habit {
    id: string;
    name: string;
    basePoints: number;
    category: 'transport' | 'energy' | 'shopping' | 'community';
}

export const HABITS: Habit[] = [
    { id: 'cycling', name: 'Cycling to Work', basePoints: 50, category: 'transport' },
    { id: 'recycling', name: 'Recycling Waste', basePoints: 20, category: 'community' },
    { id: 'reusable_bags', name: 'Using Reusable Bags', basePoints: 10, category: 'shopping' },
    { id: 'short_shower', name: 'Short Shower (< 5 min)', basePoints: 30, category: 'energy' },
    { id: 'meat_free_meal', name: 'Meat-free Meal', basePoints: 40, category: 'shopping' },
];

export interface UserStats {
    totalPoints: number;
    currentStreak: number;
    lastActionDate?: string;
    badges: string[];
}

/**
 * Calculate points for an action
 */
export function calculateActionPoints(habitId: string, multiplier: number = 1): number {
    const habit = HABITS.find(h => h.id === habitId);
    return habit ? Math.round(habit.basePoints * multiplier) : 0;
}

/**
 * Update user streak based on last action date
 */
export function updateStreak(currentStreak: number, lastActionDate?: string): number {
    if (!lastActionDate) return 1;

    const last = new Date(lastActionDate);
    const now = new Date();

    // Normalize dates to midnight for comparison
    const lastMidnight = new Date(last.getFullYear(), last.getMonth(), last.getDate());
    const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffDays = Math.floor((nowMidnight.getTime() - lastMidnight.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
        return currentStreak + 1; // Consecutive day
    } else if (diffDays === 0) {
        return currentStreak; // Already logged today
    } else {
        return 1; // Streak broken
    }
}

/**
 * Check for new badges
 */
export function checkForNewBadges(stats: UserStats): string[] {
    const newBadges: string[] = [];

    if (stats.totalPoints >= 1000 && !stats.badges.includes('Eco_Novice')) {
        newBadges.push('Eco_Novice');
    }
    if (stats.totalPoints >= 5000 && !stats.badges.includes('Eco_Warrior')) {
        newBadges.push('Eco_Warrior');
    }
    if (stats.currentStreak >= 7 && !stats.badges.includes('Week_Strong')) {
        newBadges.push('Week_Strong');
    }

    return newBadges;
}
