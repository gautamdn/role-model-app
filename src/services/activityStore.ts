import { create } from 'zustand';
import {
  ActivityData,
  ACTIVITIES,
  getActivitiesForChild,
  getAgeGroup,
} from '../constants';

interface ActivityState {
  // Today's recommended activity
  todayActivity: ActivityData | null;
  // All available activities
  allActivities: ActivityData[];
  // Completed activity IDs
  completedActivityIds: string[];
  // Loading state
  isLoading: boolean;

  // Actions
  getTodayActivity: (
    focusTraits: string[],
    birthDate: string | null
  ) => void;
  markActivityCompleted: (activityId: string) => void;
  getActivitiesForTrait: (traitId: string) => ActivityData[];
  clearCompletedActivities: () => void;
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  todayActivity: null,
  allActivities: ACTIVITIES,
  completedActivityIds: [],
  isLoading: false,

  getTodayActivity: (focusTraits, birthDate) => {
    set({ isLoading: true });

    const ageGroup = getAgeGroup(birthDate);
    const availableActivities = getActivitiesForChild(focusTraits, ageGroup);

    // Filter out completed activities if possible
    const completedIds = get().completedActivityIds;
    let uncompletedActivities = availableActivities.filter(
      (activity) => !completedIds.includes(activity.id)
    );

    // If all activities have been completed, reset and use all available
    if (uncompletedActivities.length === 0) {
      uncompletedActivities = availableActivities;
    }

    // Pick a "random" activity (use date for consistent daily activity)
    const today = new Date();
    // Use a different offset than stories so they don't align
    const dayIndex = (today.getDate() + 3) % uncompletedActivities.length;
    const todayActivity = uncompletedActivities[dayIndex] || uncompletedActivities[0] || null;

    set({ todayActivity, isLoading: false });
  },

  markActivityCompleted: (activityId) => {
    const currentCompleted = get().completedActivityIds;
    if (!currentCompleted.includes(activityId)) {
      set({ completedActivityIds: [...currentCompleted, activityId] });
    }
  },

  getActivitiesForTrait: (traitId) => {
    return get().allActivities.filter((activity) => activity.traitId === traitId);
  },

  clearCompletedActivities: () => {
    set({ completedActivityIds: [] });
  },
}));
