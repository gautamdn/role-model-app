import { create } from 'zustand';
import {
  StoryData,
  STORIES,
  getStoriesForChild,
  getAgeGroup,
} from '../constants';

interface StoryState {
  // Today's recommended story
  todayStory: StoryData | null;
  // All available stories
  allStories: StoryData[];
  // Recently viewed stories
  viewedStoryIds: string[];
  // Loading state
  isLoading: boolean;

  // Actions
  getTodayStory: (
    interests: string[],
    focusTraits: string[],
    birthDate: string | null
  ) => void;
  markStoryViewed: (storyId: string) => void;
  getStoriesForTrait: (traitId: string) => StoryData[];
  clearViewedStories: () => void;
}

export const useStoryStore = create<StoryState>((set, get) => ({
  todayStory: null,
  allStories: STORIES,
  viewedStoryIds: [],
  isLoading: false,

  getTodayStory: (interests, focusTraits, birthDate) => {
    set({ isLoading: true });

    const ageGroup = getAgeGroup(birthDate);
    const availableStories = getStoriesForChild(interests, focusTraits, ageGroup);

    // Filter out viewed stories if possible
    const viewedIds = get().viewedStoryIds;
    let unviewedStories = availableStories.filter(
      (story) => !viewedIds.includes(story.id)
    );

    // If all stories have been viewed, reset and use all available
    if (unviewedStories.length === 0) {
      unviewedStories = availableStories;
    }

    // Pick a "random" story (in production, use better algorithm)
    // For now, use date to get consistent daily story
    const today = new Date();
    const dayIndex = today.getDate() % unviewedStories.length;
    const todayStory = unviewedStories[dayIndex] || unviewedStories[0] || null;

    set({ todayStory, isLoading: false });
  },

  markStoryViewed: (storyId) => {
    const currentViewed = get().viewedStoryIds;
    if (!currentViewed.includes(storyId)) {
      set({ viewedStoryIds: [...currentViewed, storyId] });
    }
  },

  getStoriesForTrait: (traitId) => {
    return get().allStories.filter((story) => story.traitId === traitId);
  },

  clearViewedStories: () => {
    set({ viewedStoryIds: [] });
  },
}));
