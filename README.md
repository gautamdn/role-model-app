# Role Model App

A character development app for children ages 5-17 that helps them learn from inspiring role models.

## Current Status

**Phase:** Week 2 of 14 (MVP)
**Last Updated:** 2026-01-19

### Completed
- [x] React Native + Expo project setup
- [x] TypeScript configuration
- [x] Navigation structure (Stack + Bottom Tabs)
- [x] Design system (colors, typography, spacing)
- [x] UI components (Button, Input, Screen)
- [x] Supabase integration
- [x] Authentication (sign up, login, password reset)
- [x] Welcome/onboarding screens

### In Progress
- [ ] Child profile management
- [ ] Home screen dashboard

### Next Up
- Character trait selection
- Story viewing interface
- Content creation (role models, stories)

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
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Screen.tsx
├── navigation/       # Navigation configuration
│   ├── AuthNavigator.tsx
│   ├── MainNavigator.tsx
│   └── RootNavigator.tsx
├── screens/          # App screens
│   ├── auth/         # Authentication screens
│   └── main/         # Main app screens
├── services/         # API and state management
│   ├── supabase.ts
│   └── authStore.ts
├── theme/            # Design system
│   ├── colors.ts
│   ├── typography.ts
│   └── spacing.ts
├── types/            # TypeScript types
└── utils/            # Utility functions
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
