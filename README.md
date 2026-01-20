# Role Model App

A character development app for children ages 5-17 that helps them learn from inspiring role models.

## Current Status

**Phase:** Week 6 of 14 (MVP)
**Last Updated:** 2026-01-20

### Completed

**Week 1-2: Foundation**
- [x] React Native + Expo project setup
- [x] TypeScript configuration
- [x] Navigation structure (Stack + Bottom Tabs)
- [x] Design system (colors, typography, spacing)
- [x] UI components (Button, Input, Screen)
- [x] Supabase integration
- [x] Authentication (sign up, login, password reset)
- [x] Welcome/onboarding screens

**Week 3: Interests Selection**
- [x] Interest categories (Sports, Arts, Science, Lifestyle)
- [x] 24 interest options with emoji icons
- [x] Multi-select flow for child interests
- [x] Interest-to-trait mapping system

**Week 4: Character Traits**
- [x] 8 character traits (perseverance, kindness, creativity, leadership, discipline, curiosity, courage, integrity)
- [x] Trait selection screen with recommendations based on interests
- [x] TraitBadge and TraitProgressCard components
- [x] Focus traits storage in database

**Week 5: Story System**
- [x] 8 sample stories with inspiring role models
- [x] Paginated story reader interface
- [x] Key lessons and discussion questions
- [x] Age-appropriate content filtering (kids/tweens/teens)
- [x] StoryCard and StoryCardFeatured components
- [x] Zustand store for daily story selection

**Week 6: Activity System**
- [x] 14 character-building activities
- [x] 5-step activity flow (intro → instructions → doing → reflection → complete)
- [x] Materials list and tips for success
- [x] ActivityCard and ActivityCardFeatured components
- [x] Zustand store for daily activity selection

### In Progress
- [ ] Explore tab (browse all stories and activities)
- [ ] Progress tracking

### Next Up
- Week 7: Progress tracking and badges
- Week 8: Settings and preferences
- Week 9: Content expansion

## Tech Stack

- **Framework:** React Native with Expo SDK 54
- **Language:** TypeScript
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **State Management:** Zustand
- **Navigation:** React Navigation 7

## Getting Started

### Prerequisites

- Node.js 20+ (use `nvm use 20`)
- Expo Go app on your phone
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/gautamdn/role-model-app.git
cd role-model-app

# Install dependencies
npm install

# Create .env file with your Supabase credentials
cp .env.example .env
# Edit .env with your EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY
```

### Running the App

```bash
# Start Expo with tunnel mode (required for testing on physical device)
npx expo start --tunnel

# Scan the QR code with:
# - iOS: Camera app
# - Android: Expo Go app
```

### Environment Variables

Create a `.env` file in the root directory:

```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

Run the following SQL in your Supabase SQL Editor:

```sql
-- Profiles table (created automatically on user signup via trigger)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_tier TEXT DEFAULT 'free',
  subscription_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, subscription_tier)
  VALUES (new.id, 'free');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Child profiles table
CREATE TABLE IF NOT EXISTS child_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  birth_date DATE,
  interests TEXT[] DEFAULT '{}',
  focus_traits TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE child_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own children" ON child_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own children" ON child_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own children" ON child_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own children" ON child_profiles FOR DELETE USING (auth.uid() = user_id);
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Screen.tsx
│   ├── ChildCard.tsx
│   ├── TraitBadge.tsx
│   ├── StoryCard.tsx
│   └── ActivityCard.tsx
├── constants/            # App content and data
│   ├── interests.ts      # 24 interest options
│   ├── traits.ts         # 8 character traits
│   ├── stories.ts        # 8 sample stories
│   └── activities.ts     # 14 activities
├── navigation/           # Navigation configuration
│   ├── AuthNavigator.tsx
│   ├── MainNavigator.tsx
│   └── RootNavigator.tsx
├── screens/              # App screens
│   ├── auth/             # Authentication screens
│   └── main/             # Main app screens
│       ├── HomeScreen.tsx
│       ├── children/     # Child management
│       ├── stories/      # Story viewing
│       └── activities/   # Activity completion
├── services/             # API and state management
│   ├── supabase.ts
│   ├── authStore.ts
│   ├── childStore.ts
│   ├── storyStore.ts
│   └── activityStore.ts
├── theme/                # Design system
│   ├── colors.ts
│   ├── typography.ts
│   └── spacing.ts
├── types/                # TypeScript types
└── utils/                # Utility functions
```

## Documentation

- [Project Overview](./PROJECT_OVERVIEW.md)
- [Features](./FEATURES.md)
- [Tech Architecture](./TECH_ARCHITECTURE.md)
- [Development Roadmap](./ROADMAP.md)
- [Content Strategy](./CONTENT_STRATEGY.md)

## Known Issues

- `react-native-safe-area-context` SafeAreaView has issues with React Native New Architecture in Expo Go. Using RN's built-in SafeAreaView as workaround.
- `react-native-screens` must be pinned to 4.16.0 for Expo SDK 54 compatibility.

## License

Private - All rights reserved
