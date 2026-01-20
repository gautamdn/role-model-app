export type SubscriptionTier = 'free' | 'premium' | 'family';
export type JourneyStatus = 'active' | 'paused' | 'completed';
export type AgeGroup = 'kids_5_10' | 'tweens_11_14' | 'teens_15_17';

export interface User {
  id: string;
  email: string;
  created_at: string;
  subscription_tier: SubscriptionTier;
  subscription_expires_at: string | null;
}

export interface Child {
  id: string;
  parent_id: string;
  name: string;
  birth_date: string | null;
  interests: string[];
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CharacterTrait {
  id: string;
  name: string;
  description: string;
  icon_url: string;
  age_min: number;
  age_max: number;
}

export interface RoleModel {
  id: string;
  name: string;
  category: string;
  bio_summary: string;
  image_url: string;
  birth_year: number | null;
  is_active: boolean;
}

export interface Story {
  id: string;
  role_model_id: string;
  character_trait_id: string;
  title: string;
  content_text: string;
  video_url: string | null;
  duration_minutes: number;
  age_group: AgeGroup;
  key_lesson: string;
  created_at: string;
  // Joined relations
  role_model?: RoleModel;
  character_trait?: CharacterTrait;
}

export interface Activity {
  id: string;
  character_trait_id: string;
  title: string;
  description: string;
  age_min: number;
  age_max: number;
  estimated_minutes: number;
  difficulty_level: 1 | 2 | 3 | 4 | 5;
  // Joined relations
  character_trait?: CharacterTrait;
}

export interface ChildJourney {
  id: string;
  child_id: string;
  character_trait_id: string;
  started_at: string;
  status: JourneyStatus;
  weeks_completed: number;
  // Joined relations
  character_trait?: CharacterTrait;
}

export interface ActivityCompletion {
  id: string;
  child_id: string;
  activity_id: string;
  completed_at: string;
  child_reflection: string | null;
  parent_notes: string | null;
  effort_rating: 1 | 2 | 3 | 4 | 5;
  // Joined relations
  activity?: Activity;
}

export interface StoryView {
  id: string;
  child_id: string;
  story_id: string;
  viewed_at: string;
  completed: boolean;
  // Joined relations
  story?: Story;
}

// Local Activities Discovery types (Phase 2)
export interface ActivityCategory {
  id: string;
  name: string;
  parent_category: string;
  search_terms: string[];
  icon_url: string;
  created_at: string;
}

export interface SavedProgram {
  id: string;
  user_id: string;
  place_id: string;
  place_name: string;
  place_address: string;
  activity_category_id: string;
  saved_at: string;
  notes: string | null;
}
