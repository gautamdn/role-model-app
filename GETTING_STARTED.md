# Getting Started - Building the Role Model App

## Welcome!

This guide will help you get started building the Role Model App using Claude Code. By the end of this guide, you'll have a working development environment and understand the next steps.

---

## Prerequisites

### Required Knowledge
- **Basic programming concepts** (you'll learn as you go!)
- **Willingness to learn** React Native and TypeScript
- **Problem-solving mindset**

### What You DON'T Need
- ❌ Deep React Native experience (Claude Code will help)
- ❌ Backend development expertise (using Supabase)
- ❌ Mobile app deployment experience (Expo handles this)

### Required Software

**1. Node.js (v18 or higher)**
```bash
# Check if you have Node.js installed
node --version

# If not installed, download from: https://nodejs.org/
# Or use Homebrew on Mac:
brew install node
```

**2. Git**
```bash
# Check if you have Git installed
git --version

# If not installed:
# Mac: brew install git
# Windows: Download from https://git-scm.com/
```

**3. Code Editor**
- You're already using Claude Code! ✅
- Optionally: VS Code for quick file viewing

**4. Expo Go App (for testing)**
- Install on your iPhone or Android phone
- iOS: https://apps.apple.com/app/expo-go/id982107779
- Android: https://play.google.com/store/apps/details?id=host.exp.exponent

---

## Step 1: Project Setup

### Create Your Project Directory

```bash
# Navigate to where you want your project
cd ~

# Create project directory (already exists!)
cd role-model-app

# Initialize git repository
git init

# Create .gitignore file
echo "node_modules/
.expo/
.env
.env.local
dist/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
.DS_Store" > .gitignore
```

### Initialize React Native with Expo

```bash
# Create a new Expo app
npx create-expo-app@latest . --template blank-typescript

# This will create:
# - package.json
# - tsconfig.json
# - App.tsx
# - app.json
# - And other necessary files
```

### Install Core Dependencies

```bash
# Navigation
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# UI Components
npm install react-native-paper react-native-vector-icons
npm install react-native-svg

# State Management
npm install zustand

# Supabase (Backend)
npm install @supabase/supabase-js

# Storage
npm install @react-native-async-storage/async-storage

# Utilities
npm install date-fns
```

---

## Step 2: Set Up Supabase (Backend)

### Create Supabase Account

1. Go to https://supabase.com
2. Sign up with GitHub or email
3. Create a new project:
   - **Project Name:** role-model-app
   - **Database Password:** (save this securely!)
   - **Region:** Choose closest to you
   - **Pricing Plan:** Free (sufficient for MVP)

### Get Your API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., https://xxxxx.supabase.co)
   - **Anon Public Key** (starts with eyJ...)

### Create Environment Variables

```bash
# Create .env file in your project root
touch .env

# Add your Supabase credentials
echo "EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key" > .env

# Replace with your actual values!
```

### Initialize Database Schema

In Supabase dashboard, go to **SQL Editor** and run:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (managed by Supabase Auth)
-- Just add a profiles table for extra user data

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_tier TEXT DEFAULT 'free',
  subscription_expires_at TIMESTAMP WITH TIME ZONE
);

-- Children profiles
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 5 AND age <= 17),
  interests TEXT[],
  strengths TEXT[],
  growth_areas TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Character traits
CREATE TABLE character_traits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  age_min INTEGER DEFAULT 5,
  age_max INTEGER DEFAULT 17
);

-- Role models
CREATE TABLE role_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT,
  bio_summary TEXT,
  image_url TEXT,
  birth_year INTEGER,
  is_active BOOLEAN DEFAULT TRUE
);

-- Stories
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_model_id UUID REFERENCES role_models(id),
  character_trait_id UUID REFERENCES character_traits(id),
  title TEXT NOT NULL,
  content_text TEXT NOT NULL,
  video_url TEXT,
  duration_minutes INTEGER,
  age_group TEXT,
  key_lesson TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  character_trait_id UUID REFERENCES character_traits(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  age_min INTEGER,
  age_max INTEGER,
  estimated_minutes INTEGER,
  difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 5)
);

-- Child journeys
CREATE TABLE child_journeys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  character_trait_id UUID REFERENCES character_traits(id),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active',
  weeks_completed INTEGER DEFAULT 0
);

-- Activity completions
CREATE TABLE activity_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id),
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  child_reflection TEXT,
  parent_notes TEXT,
  effort_rating INTEGER CHECK (effort_rating >= 1 AND effort_rating <= 5)
);

-- Story views
CREATE TABLE story_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  story_id UUID REFERENCES stories(id),
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_journeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_views ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only access their own data)
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can view own children"
  ON children FOR ALL
  USING (auth.uid() = parent_id);

CREATE POLICY "Users can view own child journeys"
  ON child_journeys FOR ALL
  USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));

-- Public read access for content tables
CREATE POLICY "Anyone can view character traits"
  ON character_traits FOR SELECT
  USING (TRUE);

CREATE POLICY "Anyone can view role models"
  ON role_models FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Anyone can view stories"
  ON stories FOR SELECT
  USING (TRUE);

CREATE POLICY "Anyone can view activities"
  ON activities FOR SELECT
  USING (TRUE);
```

---

## Step 3: Project Structure

### Create Folder Structure

```bash
# Create all necessary folders
mkdir -p src/{components,screens,navigation,services,hooks,utils,types}
mkdir -p assets/{images,fonts,animations}
```

### Your Project Structure Should Look Like:

```
role-model-app/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # Screen components
│   ├── navigation/      # Navigation configuration
│   ├── services/        # API calls, Supabase client
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   └── types/           # TypeScript type definitions
├── assets/
│   ├── images/
│   ├── fonts/
│   └── animations/
├── App.tsx              # Root component
├── app.json             # Expo configuration
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── .env                 # Environment variables (git ignored)
├── .gitignore
└── Documentation files (already created!)
```

---

## Step 4: Create Supabase Client

Create a file to connect to Supabase:

```bash
touch src/services/supabase.ts
```

Add this content:

```typescript
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Update `app.json` to include environment variables:

```json
{
  "expo": {
    "name": "RoleModelApp",
    "slug": "role-model-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "extra": {
      "supabaseUrl": process.env.EXPO_PUBLIC_SUPABASE_URL,
      "supabaseAnonKey": process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
    }
  }
}
```

---

## Step 5: Run Your App

### Start the Development Server

```bash
# Start Expo
npx expo start

# You'll see a QR code in your terminal
```

### Test on Your Phone

1. Open **Expo Go** app on your phone
2. Scan the QR code from terminal
3. App will load on your phone!

### Test in Simulator (Optional)

```bash
# iOS Simulator (Mac only)
npm run ios

# Android Emulator
npm run android
```

---

## Step 6: First Commit

```bash
# Add all files
git add .

# Commit
git commit -m "Initial project setup with Expo and Supabase"

# Optionally: Create GitHub repo and push
# gh repo create role-model-app --private --source=. --remote=origin
# git push -u origin main
```

---

## Next Steps (Week 1)

Now that your environment is set up, here's what to build first:

### Day 1-2: Authentication
- Create login screen
- Create signup screen
- Implement Supabase auth
- Test login/logout flow

### Day 3-4: Navigation
- Set up React Navigation
- Create main tab navigation
- Create stack navigation for auth
- Add placeholder screens

### Day 5-7: Child Profile
- Create child profile form
- Implement CRUD operations
- Test creating/editing profiles

**Claude Code will help you build all of this! Just ask:**
- "Let's build the login screen"
- "Help me set up React Navigation"
- "Create the child profile form"

---

## Helpful Commands

```bash
# Start development server
npx expo start

# Clear cache (if things break)
npx expo start -c

# Install a new package
npm install package-name

# Check TypeScript errors
npx tsc --noEmit

# Format code (after installing prettier)
npx prettier --write .

# View logs
npx expo start --ios  # iOS logs
npx expo start --android  # Android logs
```

---

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### "Expo Go won't load my app"
- Make sure phone and computer are on same WiFi
- Try `npx expo start -c` to clear cache
- Restart Expo Go app

### "Environment variables not working"
- Check `.env` file exists
- Restart Expo dev server
- Make sure using `EXPO_PUBLIC_` prefix

### "TypeScript errors"
```bash
# Ignore for now, fix later
# Or ask Claude Code: "Fix these TypeScript errors"
```

---

## Getting Help

**From Claude Code:**
- "I'm getting this error: [paste error]"
- "How do I implement [feature]?"
- "Explain how [code] works"

**Documentation:**
- Expo: https://docs.expo.dev/
- React Native: https://reactnative.dev/
- Supabase: https://supabase.com/docs
- React Navigation: https://reactnavigation.org/

**Community:**
- Expo Discord: https://chat.expo.dev/
- r/reactnative on Reddit
- Stack Overflow

---

## Checklist: Are You Ready to Build?

- [ ] Node.js installed (v18+)
- [ ] Git installed
- [ ] Expo project created
- [ ] Dependencies installed
- [ ] Supabase account created
- [ ] Database schema initialized
- [ ] Environment variables configured
- [ ] App runs on phone via Expo Go
- [ ] First commit made
- [ ] Read through documentation files

**If you checked all boxes, you're ready to start building! 🎉**

---

## What to Build First

Say to Claude Code:

**"Let's start building the authentication screens. Create a login screen with email and password fields that connects to Supabase."**

Claude Code will:
1. Create the login screen component
2. Add styling
3. Implement Supabase authentication
4. Handle errors
5. Test the flow with you

Then continue with:
- "Create the signup screen"
- "Add navigation between login and signup"
- "Create the home screen after login"

**You're not alone in this journey—Claude Code will guide you through every step!**

---

## Estimated Timeline

**Week 1:** Foundation & Auth (20-30 hours)
**Week 2:** Basic UI & Navigation (20-30 hours)
**Week 3-4:** Core Features (40-50 hours)
**Week 5-12:** Full MVP (150-200 hours total)

**Part-time (10-15 hours/week):** 14-20 weeks
**Full-time (40+ hours/week):** 5-6 weeks

**Remember:** Use Claude Code aggressively. It will write 70-80% of the code for you!

---

## Ready? Let's Build!

Type this to Claude Code when you're ready:

**"I'm ready to start building. Let's create the authentication flow with Supabase."**

Good luck! 🚀

---

*Last Updated: 2026-01-15*
