# Technical Architecture

## Overview

Modern mobile-first architecture with AI-powered personalization, built for rapid development and scalability.

---

## Tech Stack

### Frontend - Mobile App

**Framework:** React Native with Expo
- **Why:** Single codebase for iOS + Android, rapid development, OTA updates
- **Version:** Latest stable (Expo SDK 50+)
- **Language:** TypeScript for type safety

**UI Library:** React Native Paper or NativeBase
- Consistent, accessible components
- Material Design or iOS-friendly styling
- Built-in theming

**Navigation:** React Navigation v6
- Stack, Tab, and Drawer navigators
- Deep linking support
- Type-safe routing

**State Management:** Zustand or Redux Toolkit
- Simple, performant state management
- Persist user preferences locally
- Minimal boilerplate

**Local Storage:** AsyncStorage or MMKV
- Cache user data
- Offline support for activities
- Secure storage for tokens

**Animations:**
- Lottie (JSON animations)
- React Native Reanimated (complex animations)
- Child-friendly, engaging UX

---

### Backend

**Backend-as-a-Service:** Supabase
- **Database:** PostgreSQL (relational data)
- **Authentication:** Built-in auth with email/password
- **Storage:** S3-compatible storage for images/videos
- **Real-time:** WebSocket subscriptions (optional for future features)
- **Row Level Security:** Secure data access patterns

**Why Supabase:**
- Open source, can self-host if needed
- PostgreSQL is powerful and familiar
- Built-in auth saves development time
- Generous free tier
- Easy integration with React Native

**Alternative:** Firebase (if you prefer Google ecosystem)

---

### AI & Content Generation

**Primary LLM:** OpenAI GPT-4o or Anthropic Claude 3.5 Sonnet
- Personalized activity generation
- Age-appropriate content adaptation
- Parent coaching tips
- Dynamic discussion prompts

**Vector Database:** Pinecone or Qdrant
- Store role model knowledge embeddings
- Semantic search for stories by trait
- RAG (Retrieval-Augmented Generation) for accurate content
- Personalized story recommendations

**Content Moderation:** OpenAI Moderation API
- Filter AI-generated content for safety
- Child-appropriate content checks
- Automatic flagging of inappropriate material

**Implementation:**
```typescript
// Example: Personalized activity generation
const generateActivity = async (childProfile, trait) => {
  const context = await vectorDB.query({
    trait,
    ageGroup: childProfile.age,
    topK: 3
  });

  const prompt = `Generate age-appropriate activity for:
  - Age: ${childProfile.age}
  - Trait: ${trait}
  - Interests: ${childProfile.interests}
  Context: ${context}`;

  const activity = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }]
  });

  // Run through moderation
  const moderation = await openai.moderations.create({
    input: activity.content
  });

  return moderation.flagged ? null : activity;
};
```

---

### Media & Content Delivery

**Image/Video Storage:** AWS S3 or Cloudflare R2
- Store role model images
- Story illustrations
- User profile photos (optional)

**CDN:** CloudFront or Cloudflare CDN
- Fast global delivery
- Reduced latency for media
- Cost optimization

**Video Streaming (Future):** Cloudflare Stream or Mux
- Optimized video delivery
- Adaptive bitrate streaming
- Analytics

---

### Infrastructure & DevOps

**Hosting:**
- **Backend:** Supabase Cloud (managed)
- **Serverless Functions:** Supabase Edge Functions or Vercel Functions
- **Mobile App:** Expo EAS (build & deploy)

**Authentication:** Supabase Auth
- Email/password authentication
- JWT tokens
- Refresh token rotation
- Password reset flows

**Analytics:** Mixpanel or Amplitude
- User behavior tracking
- Conversion funnels
- Retention analysis
- A/B testing capability

**Error Tracking:** Sentry
- Real-time error monitoring
- Performance tracking
- Release tracking
- Source map support

**Monitoring:**
- Supabase Dashboard (database metrics)
- Expo Application Services (crash reports)
- Custom logging to CloudWatch or similar

---

## Database Schema

### Core Tables

```sql
-- Users (Parents)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  subscription_tier VARCHAR(50) DEFAULT 'free',
  subscription_expires_at TIMESTAMP
);

-- Children Profiles
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL,
  interests TEXT[],
  strengths TEXT[],
  growth_areas TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Character Traits
CREATE TABLE character_traits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon_url TEXT,
  age_min INTEGER DEFAULT 5,
  age_max INTEGER DEFAULT 17
);

-- Role Models
CREATE TABLE role_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  category VARCHAR(100), -- athlete, scientist, artist, etc.
  bio_summary TEXT,
  image_url TEXT,
  birth_year INTEGER,
  is_active BOOLEAN DEFAULT true
);

-- Stories (Role Model + Trait combinations)
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_model_id UUID REFERENCES role_models(id),
  character_trait_id UUID REFERENCES character_traits(id),
  title VARCHAR(200) NOT NULL,
  content_text TEXT NOT NULL,
  video_url TEXT,
  duration_minutes INTEGER,
  age_group VARCHAR(50), -- kids_5_10, tweens_11_14, teens_15_17
  key_lesson TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pre-written Activities
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  character_trait_id UUID REFERENCES character_traits(id),
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  age_min INTEGER,
  age_max INTEGER,
  estimated_minutes INTEGER,
  difficulty_level INTEGER -- 1-5
);

-- Child's Active Journeys
CREATE TABLE child_journeys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  character_trait_id UUID REFERENCES character_traits(id),
  started_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'active', -- active, paused, completed
  weeks_completed INTEGER DEFAULT 0
);

-- Activity Completions
CREATE TABLE activity_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id),
  completed_at TIMESTAMP DEFAULT NOW(),
  child_reflection TEXT,
  parent_notes TEXT,
  effort_rating INTEGER -- 1-5
);

-- Story Views
CREATE TABLE story_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  story_id UUID REFERENCES stories(id),
  viewed_at TIMESTAMP DEFAULT NOW(),
  completed BOOLEAN DEFAULT false
);

-- Media Literacy Progress
CREATE TABLE media_literacy_lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  lesson_topic VARCHAR(200) NOT NULL,
  completed_at TIMESTAMP DEFAULT NOW(),
  quiz_score INTEGER
);

-- AI-Generated Activities (Premium)
CREATE TABLE ai_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  character_trait_id UUID REFERENCES character_traits(id),
  title VARCHAR(200),
  description TEXT,
  generated_at TIMESTAMP DEFAULT NOW(),
  prompt_context JSONB -- store what we sent to AI for debugging
);

-- =====================================================
-- LOCAL ACTIVITIES DISCOVERY (Phase 2)
-- =====================================================

-- Activity Categories (maps role models to searchable activity types)
CREATE TABLE activity_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL, -- e.g., "Gymnastics", "Music", "Theater"
  parent_category VARCHAR(100), -- e.g., "Sports", "Arts", "Science"
  search_terms TEXT[], -- ["gymnastics classes", "tumbling", "acrobatics"]
  icon_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Role Model to Activity Category mapping (many-to-many)
CREATE TABLE role_model_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_model_id UUID REFERENCES role_models(id) ON DELETE CASCADE,
  activity_category_id UUID REFERENCES activity_categories(id) ON DELETE CASCADE,
  relevance_score INTEGER DEFAULT 100, -- primary activity = 100, secondary = 50
  UNIQUE(role_model_id, activity_category_id)
);

-- Saved Local Programs (user wishlist)
CREATE TABLE saved_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  place_id VARCHAR(255) NOT NULL, -- Google Places ID
  place_name VARCHAR(255) NOT NULL,
  place_address TEXT,
  activity_category_id UUID REFERENCES activity_categories(id),
  saved_at TIMESTAMP DEFAULT NOW(),
  notes TEXT,
  UNIQUE(user_id, place_id)
);

-- Featured/Partner Listings (B2B monetization)
CREATE TABLE partner_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  place_id VARCHAR(255), -- Google Places ID (optional, for linking)
  business_name VARCHAR(255) NOT NULL,
  business_description TEXT,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  website_url TEXT,
  logo_url TEXT,
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  activity_category_id UUID REFERENCES activity_categories(id),
  listing_tier VARCHAR(50) DEFAULT 'basic', -- basic, featured, premium
  monthly_fee DECIMAL(10, 2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- Affiliate Click Tracking
CREATE TABLE affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  place_id VARCHAR(255),
  partner_listing_id UUID REFERENCES partner_listings(id),
  affiliate_platform VARCHAR(100), -- 'google_places', 'sawyer', 'activityhero'
  clicked_at TIMESTAMP DEFAULT NOW(),
  converted BOOLEAN DEFAULT false,
  conversion_value DECIMAL(10, 2)
);

-- Local Search Cache (reduce API calls)
CREATE TABLE local_search_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  search_query VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  radius_miles INTEGER DEFAULT 10,
  results JSONB NOT NULL, -- cached Google Places results
  cached_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '24 hours',
  UNIQUE(search_query, latitude, longitude, radius_miles)
);
```

---

## API Architecture

### REST API Endpoints (via Supabase)

**Authentication:**
- `POST /auth/signup` - Create parent account
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `POST /auth/reset-password` - Password reset

**Children:**
- `GET /children` - List user's children
- `POST /children` - Create child profile
- `PUT /children/:id` - Update child profile
- `DELETE /children/:id` - Delete child profile

**Character Traits:**
- `GET /character-traits` - List all traits
- `GET /character-traits/:id` - Get trait details

**Role Models & Stories:**
- `GET /role-models` - List role models (filterable)
- `GET /role-models/:id` - Get role model details
- `GET /stories?trait=:traitId&age=:age` - Get stories for trait/age
- `GET /stories/:id` - Get specific story

**Activities:**
- `GET /activities?trait=:traitId&age=:age` - Get activities
- `POST /activity-completions` - Mark activity complete
- `GET /child/:id/activities/recent` - Recent activities

**Journeys:**
- `POST /child-journeys` - Start new character journey
- `GET /child/:id/journeys` - Get child's active journeys
- `PUT /child-journeys/:id` - Update journey status

**AI Generation (Serverless Function):**
- `POST /api/generate-activity` - Generate personalized activity
- `POST /api/generate-prompt` - Generate discussion prompt

**Local Activities Discovery (Phase 2):**
- `GET /activity-categories` - List all activity categories
- `GET /role-models/:id/activities` - Get activity categories for a role model
- `GET /api/local-search?lat=:lat&lng=:lng&category=:categoryId` - Search local programs
- `GET /saved-programs` - Get user's saved programs
- `POST /saved-programs` - Save a program to wishlist
- `DELETE /saved-programs/:id` - Remove from wishlist
- `GET /partner-listings?category=:categoryId&lat=:lat&lng=:lng` - Get featured partners
- `POST /api/track-click` - Track affiliate click for analytics

---

## Security

### Authentication & Authorization
- JWT tokens with short expiration (1 hour)
- Refresh tokens stored securely
- Row Level Security (RLS) on all tables
- Parents can only access their own children's data

### Data Privacy (COPPA Compliance)
- Minimal data collection
- No sharing with third parties
- Parent-controlled data deletion
- Age verification for parent accounts
- No child email addresses collected

### Content Safety
- All AI content through moderation API
- Human review of sample content (10% weekly)
- Parent reporting mechanism
- Flagged content review process

---

## Scalability Considerations

### Current (MVP) Scale
- Expected: 100-1,000 users
- Database: Supabase free tier (sufficient)
- Storage: <10GB media
- API calls: Well within free tier limits

### Growth Phase (1-10K users)
- Upgrade to Supabase Pro ($25/month)
- CDN for media (reduces costs)
- Cache frequently accessed data
- Optimize database queries with indexes

### Scale (10K+ users)
- Consider database read replicas
- Implement Redis caching layer
- Rate limiting on AI generation
- Batch processing for analytics
- Consider moving to dedicated infrastructure

---

## Development Environment

### Local Development
```bash
# Project structure
role-model-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # Screen components
│   ├── navigation/     # Navigation config
│   ├── services/       # API calls, Supabase client
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Helpers, constants
│   └── types/          # TypeScript types
├── assets/             # Images, fonts, animations
├── supabase/           # Database migrations, functions
└── app.json            # Expo configuration
```

### Environment Variables
```bash
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
OPENAI_API_KEY=your-openai-key
PINECONE_API_KEY=your-pinecone-key
STRIPE_PUBLISHABLE_KEY=your-stripe-key
```

### Testing Strategy
- **Unit Tests:** Jest for utilities/services
- **Component Tests:** React Native Testing Library
- **E2E Tests:** Detox (later phase)
- **Manual Testing:** Expo Go on physical devices

---

## Deployment Pipeline

### Mobile App (Expo EAS)
1. Development builds for testing
2. Preview builds for stakeholders
3. Production builds for app stores
4. Over-the-air (OTA) updates for JS/content changes

### Backend (Supabase)
1. Local development with Supabase CLI
2. Migrations applied to staging
3. Test in staging environment
4. Promote to production

### CI/CD
- GitHub Actions for automated testing
- EAS Build on git push to main
- Automated migrations on deploy
- Sentry release tracking

---

## Cost Estimate (Monthly)

**MVP Phase:**
- Supabase: $0 (free tier)
- Expo EAS: $0 (hobby tier for dev)
- OpenAI API: ~$10-30 (usage-based)
- Cloudflare/CDN: $0 (free tier)
- Domain: ~$1/month
- **Total: $10-30/month**

**Growth Phase (1,000 users):**
- Supabase Pro: $25
- Expo EAS: $0-29 (depending on builds)
- OpenAI API: ~$100-200
- CDN/Storage: ~$10-20
- Analytics: $0-25 (Mixpanel free tier)
- **Total: $135-299/month**

---

*Last Updated: 2026-01-15*
