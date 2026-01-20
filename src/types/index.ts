export * from './database';

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type MainStackParamList = {
  HomeTabs: undefined;
  AddChild: undefined;
  SelectInterests: { childId: string; childName: string; isNewChild: boolean };
  SelectTraits: { childId: string; childName: string; isNewChild: boolean };
  EditChild: { childId: string };
  StoryDetail: { storyId: string };
  ActivityDetail: { activityId: string };
  RoleModelProfile: { roleModelId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Progress: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  StoryDetail: { storyId: string };
  ActivityDetail: { activityId: string };
  RoleModelProfile: { roleModelId: string };
};

export type ExploreStackParamList = {
  ExploreScreen: undefined;
  TraitDetail: { traitId: string };
  RoleModelProfile: { roleModelId: string };
  StoryDetail: { storyId: string };
};

// Auth types
export interface AuthState {
  user: import('./database').User | null;
  session: {
    access_token: string;
    refresh_token: string;
  } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Child context types
export interface ChildContextState {
  children: import('./database').Child[];
  activeChild: import('./database').Child | null;
  isLoading: boolean;
}
