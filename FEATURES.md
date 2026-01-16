# Feature Specifications

## MVP Features (Phase 1)

### 1. Authentication & Onboarding

#### 1.1 Parent Account Creation
**User Story:** As a parent, I want to create an account so I can manage my children's character development.

**Features:**
- Email/password sign-up
- Email verification
- Terms of service & privacy policy acceptance
- COPPA compliance notice

**Screens:**
- Welcome screen with value proposition
- Sign up form
- Email verification prompt
- Login screen

#### 1.2 Educational Introduction
**User Story:** As a parent, I want to understand the app's philosophy before starting.

**Features:**
- 2-minute parent education module
- "How Role Models Work in This App"
- Key messaging about process over outcome
- Option to skip (can revisit later)

**Content:**
- "We use inspiring stories to teach character, not to create comparisons"
- "Your child will learn from multiple role models, not fixate on one"
- "Focus on effort and growth, not achievement"

---

### 2. Child Profile Management

#### 2.1 Create Child Profile
**User Story:** As a parent, I want to create profiles for each of my children so they can have personalized experiences.

**Required Fields:**
- Child's name
- Age (5-17)
- Current interests (multi-select)
- Photo (optional)

**Optional Fields:**
- "What makes [name] special?" (strengths)
- "What would you like to help [name] work on?" (growth areas)

**Validations:**
- Age must be 5-17
- Name required
- At least 1 interest selected

#### 2.2 Manage Profiles
**Features:**
- View all children
- Edit child information
- Delete child profile (with confirmation)
- Switch between children

**Free Tier Limitation:** 1 child profile
**Premium:** Up to 3 children

---

### 3. Character Trait Selection

#### 3.1 Browse Traits
**User Story:** As a parent, I want to browse character traits so I can choose what my child should work on.

**8 Core Traits:**

1. **Perseverance**
   - Description: "Overcoming obstacles and never giving up"
   - Icon: Mountain/climbing
   - Example role models: Simone Biles, Stephen Hawking, Malala

2. **Kindness & Empathy**
   - Description: "Caring for others and showing compassion"
   - Icon: Heart/helping hands
   - Example role models: Dolly Parton, Mr. Rogers, Desmond Tutu

3. **Creativity**
   - Description: "Thinking in new ways and expressing yourself"
   - Icon: Lightbulb/paint brush
   - Example role models: Lin-Manuel Miranda, Pixar creators, Marie Curie

4. **Leadership**
   - Description: "Taking responsibility and inspiring others"
   - Icon: Star/compass
   - Example role models: Greta Thunberg, Nelson Mandela, Coach K

5. **Discipline**
   - Description: "Building good habits and staying consistent"
   - Icon: Calendar/checklist
   - Example role models: Kobe Bryant, Yo-Yo Ma, Serena Williams

6. **Curiosity**
   - Description: "Loving to learn and asking great questions"
   - Icon: Telescope/magnifying glass
   - Example role models: Neil deGrasse Tyson, Jane Goodall, Steve Jobs

7. **Courage**
   - Description: "Facing fears and standing up for what's right"
   - Icon: Shield/lion
   - Example role models: Rosa Parks, Harriet Tubman, Malala Yousafzai

8. **Integrity**
   - Description: "Being honest and doing the right thing"
   - Icon: Checkmark/handshake
   - Example role models: Ruth Bader Ginsburg, Abraham Lincoln, Jackie Robinson

**UI/UX:**
- Card-based layout
- Tap to see details
- Preview of 3 role models per trait
- "Start Journey" button

#### 3.2 Start Character Journey
**User Story:** As a parent and child together, we want to start working on a character trait.

**Flow:**
1. Select trait
2. Show 4-week journey preview
3. Explain what to expect (stories, activities, reflections)
4. Confirm and start

**Free Tier:** 1 active trait at a time
**Premium:** Multiple traits simultaneously

---

### 4. Daily Experience

#### 4.1 Home Dashboard
**User Story:** As a child, I want to see what I should do today.

**Elements:**
- Greeting: "Good morning, [name]!"
- Current trait progress (week X of 4)
- Today's story card
- Today's activity card
- Streak counter (days active this week)
- Visual progress bar

#### 4.2 Story Viewing
**User Story:** As a child, I want to learn about role models who developed this character trait.

**Story Format:**
- Title: "[Role Model]'s Journey with [Trait]"
- Hero image of role model
- 300-500 word story (age-appropriate)
- Duration: 2-4 minutes to read
- Key lesson highlight
- Discussion prompt for parents

**Example Story Structure:**
```
Title: "Simone Biles and the Power of Perseverance"

Content:
- Introduction: Who is Simone Biles?
- The Challenge: Obstacles she faced
- How She Responded: Specific actions she took
- The Outcome: What she learned (not just achievement)
- Universal Lesson: How any child can apply this

Key Lesson: "Perseverance isn't about being perfect.
It's about trying again after you make mistakes."

Discussion Prompt: "Ask your child: Tell me about
a time you kept trying even when something was hard."
```

**Features:**
- Scroll to read
- Bookmark stories (premium)
- Mark as complete
- "Next Story" recommendation
- Share with parent (notification)

#### 4.3 Daily Activities
**User Story:** As a child, I want to practice the character trait with a fun activity.

**Activity Format:**
- Title
- Estimated time (10-15 minutes)
- Difficulty indicator (1-5)
- Clear instructions (numbered steps)
- Materials needed (if any)
- Reflection questions

**Example Activity (Perseverance, Age 8):**
```
Title: "The 10-Minute Challenge"

Time: 10 minutes
Difficulty: ⭐⭐ (Easy)

Instructions:
1. Pick something you find hard (puzzle, drawing, sport move)
2. Set a timer for 10 minutes
3. Try your best without giving up
4. Notice how you feel when it's difficult
5. Celebrate that you kept going!

Reflection:
- How did you feel when it got hard?
- What did you tell yourself to keep going?
- What would you tell a friend who wants to give up?
```

**Features:**
- Start activity
- Timer (optional)
- Mark as complete
- Add reflection (text or voice)
- Rate effort (1-5 stars)
- Parent can add notes

#### 4.4 Progress Tracking
**User Story:** As a parent, I want to see my child's progress over time.

**Metrics:**
- Stories viewed this week
- Activities completed this week
- Current streak (consecutive days)
- Total journey progress (week X of 4)
- Reflections captured

**Visualization:**
- Progress bar for current trait
- Badge system (non-competitive):
  - Week 1 complete badge
  - Week 2 complete badge
  - 7-day streak badge
  - First reflection badge

**Parent Dashboard:**
- View all children's progress
- Read child reflections
- See suggested conversation topics
- Weekly summary report

---

### 5. Role Model Library

#### 5.1 Browse Role Models
**User Story:** As a child, I want to explore different role models.

**Features:**
- Grid/list view of role models
- Filter by:
  - Character trait
  - Category (athlete, scientist, artist, etc.)
  - Time period (historical vs. contemporary)
- Search by name

**Role Model Card:**
- Photo
- Name
- One-line description
- Character traits they exemplify (tags)
- "View Stories" button

#### 5.2 Role Model Profile
**User Story:** As a child, I want to learn more about a specific role model.

**Profile Includes:**
- Header photo
- Name and basic info (birth year, category)
- Short bio (100 words)
- "Known for" highlights
- Character traits they exemplify
- List of available stories
- "Fun Facts" section

**Media Literacy Component:**
"Remember: We're learning from [Name]'s character and journey, not trying to become them. Everyone's path is different!"

---

### 6. Subscription & Payments

#### 6.1 Free Tier Features
- 1 child profile
- 1 active character trait
- Access to 20 role models
- 3 activities per week
- Basic progress tracking
- View ads (child-safe only)

#### 6.2 Premium Upgrade Flow
**Trigger Points:**
- Try to add 2nd child → upgrade prompt
- Try to start 2nd trait → upgrade prompt
- Complete 3 activities in a week → upgrade prompt
- Try to access premium role model → upgrade prompt

**Upgrade Screen:**
- Feature comparison table
- Pricing options:
  - Monthly: $11.99/month
  - Annual: $99/year (save 31%)
- 7-day free trial
- "Start Free Trial" CTA

#### 6.3 Payment Integration
**Provider:** Stripe
- Secure payment processing
- Support credit cards, Apple Pay, Google Pay
- Subscription management
- Receipt emails
- Cancel anytime

---

### 7. Settings & Account Management

#### 7.1 Parent Settings
- Account info (email, password)
- Notification preferences
  - Daily activity reminders
  - Weekly progress reports
  - New content alerts
- Subscription management
- Privacy settings
- Delete account

#### 7.2 App Settings
- Child profiles management
- Content preferences
  - Age sensitivity level
  - Content categories to avoid
- Offline mode
- Help & support
- About & privacy policy

---

## Phase 2 Features (Post-MVP)

### 8. Media Literacy Module

#### 8.1 Age-Appropriate Lessons
**12 Core Lessons:**

**For Kids (5-10):**
1. Real vs. Make-Believe (photos can be edited)
2. Everyone Has Hard Days (social media highlights)
3. Teamwork Makes Success (celebrities have helpers)
4. Your Own Special Path (comparison is unfair)

**For Tweens/Teens (11-17):**
1. The Filter Effect (beauty standards)
2. Behind the Scenes (PR teams, stylists, trainers)
3. Failure Stories (celebrities' setbacks)
4. Different Paths to Success (no one "right" way)
5. Mental Health Reality (fame ≠ happiness)
6. Your Worth ≠ Your Achievements

**Lesson Format:**
- 5-minute interactive lesson
- Story or scenario
- Quiz questions (3-5)
- Discussion prompt
- Certificate of completion

#### 8.2 Parent Discussion Guides
- Conversation starters for each lesson
- Warning signs of unhealthy fixation
- How to discuss celebrity news with kids
- Building media literacy at home

---

### 9. Advanced Personalization

#### 9.1 AI-Generated Activities
**User Story:** As a premium user, I want activities tailored to my child's specific interests.

**Features:**
- Generate custom activities using AI
- Incorporate child's interests (soccer, art, music, etc.)
- Adaptive difficulty based on past completions
- Unlimited generations (premium)

**Example:**
- Standard activity: "Practice perseverance with a puzzle"
- AI-personalized: "Practice perseverance by learning a new soccer trick"
  (for a child interested in soccer)

#### 9.2 Parent Coaching
**User Story:** As a parent, I want guidance on how to support my child's development.

**Features:**
- Weekly coaching tips
- "How to discuss [trait] with your child"
- Age-specific advice
- Conversation starters based on progress
- AI chat for parenting questions (premium)

---

### 10. Local Activities Discovery (NEW)

#### 10.1 "Try It Locally" Feature
**User Story:** As a parent, when my child is inspired by a role model like Simone Biles, I want to find local gymnastics programs where they can actually practice that activity.

**Core Functionality:**
- Automatic activity type detection from role model profiles
- Location-based search for relevant programs
- Age-appropriate filtering
- Distance and price filters

**UI Placement:**
- "Try It Locally" button on role model profiles
- Dedicated "Classes Near You" section in main navigation
- Contextual prompts after completing related stories

**Search Results Display:**
- Program name and logo
- Distance from user
- Age range served
- Price range (when available)
- Ratings/reviews
- "Learn More" → opens external booking
- "Save for Later" → adds to wishlist

#### 10.2 Activity Category Mapping
**Data Structure:**
```
role_models → activity_categories → local_search_terms

Examples:
- Simone Biles → gymnastics → ["gymnastics classes", "tumbling", "acrobatics"]
- Yo-Yo Ma → music → ["cello lessons", "music school", "orchestra for kids"]
- Lin-Manuel Miranda → theater → ["drama classes", "musical theater", "acting camp"]
- Jane Goodall → science/nature → ["nature camps", "wildlife education", "science programs"]
- Kobe Bryant → basketball → ["basketball training", "youth basketball", "sports camp"]
- Misty Copeland → dance → ["ballet classes", "dance studio", "dance academy"]
```

**Category Taxonomy:**
| Category | Sub-categories | Example Role Models |
|----------|---------------|---------------------|
| Sports | Gymnastics, Basketball, Soccer, Swimming, Tennis | Simone Biles, Kobe Bryant, Serena Williams |
| Music | Instrumental, Vocal, Orchestra, Band | Yo-Yo Ma, Questlove |
| Arts | Visual arts, Theater, Dance, Film | Lin-Manuel Miranda, Frida Kahlo, Misty Copeland |
| Science | Nature, Space, Technology, Engineering | Jane Goodall, Neil deGrasse Tyson, Mae Jemison |
| Leadership | Public speaking, Debate, Student government | Greta Thunberg, Malala Yousafzai |

#### 10.3 Technical Implementation
**Phase 1 - Google Places API:**
- Use Google Places Nearby Search
- Filter by category keywords
- Sort by distance and rating
- Cache results for 24 hours

**Phase 2 - Affiliate Partnerships:**
- Integrate with Sawyer API (kids classes marketplace)
- Integrate with ActivityHero API (camps and activities)
- Track referral clicks and conversions
- Display partner badge for verified programs

**Phase 3 - Direct Partnerships (B2B):**
- Featured listing program for gyms/studios
- Premium placement in search results
- Analytics dashboard for partners
- Lead generation tracking

#### 10.4 Monetization Strategy
**Affiliate Revenue:**
- 5-15% commission on bookings through partner platforms
- Track via referral links and cookies
- Monthly payout from partners

**Featured Listings (B2B):**
- Basic listing: Free (Google Places data)
- Featured listing: $50-100/month
  - Priority placement
  - Custom description
  - Direct contact button
  - Analytics dashboard
- Premium listing: $150-200/month
  - Everything in Featured
  - Homepage showcase
  - Push notification to nearby users
  - Exclusive "Partner Program" badge

**Premium User Features:**
- Unlimited saved programs (free: 5)
- Price comparison tools
- Availability alerts
- Exclusive partner discounts

#### 10.5 User Experience Flow
```
Child reads Simone Biles story
    ↓
Story completion screen shows:
"Want to try gymnastics like Simone?"
[Find Classes Near Me] button
    ↓
Location permission prompt (if not granted)
    ↓
Search results:
┌─────────────────────────────────────┐
│ 🏆 Featured                         │
│ ┌─────────────────────────────────┐ │
│ │ 🤸 Elite Gymnastics Academy     │ │
│ │ ⭐ 4.8 (127 reviews)            │ │
│ │ 📍 2.3 miles • Ages 5-12       │ │
│ │ 💰 $150-200/month              │ │
│ │ [Learn More] [Save]            │ │
│ └─────────────────────────────────┘ │
│                                     │
│ More Options                        │
│ ┌─────────────────────────────────┐ │
│ │ 🤸 YMCA Gymnastics Program      │ │
│ │ ⭐ 4.5 (89 reviews)             │ │
│ │ 📍 3.1 miles • Ages 4-14       │ │
│ │ 💰 $80-120/month               │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Filter] [Sort by: Distance ▼]     │
└─────────────────────────────────────┘
```

#### 10.6 Privacy & Safety Considerations
- Location data only used for searches, not stored
- No child location tracking
- All programs link to external sites (no booking in-app)
- Parent controls required to view local results
- Clear disclosure of affiliate relationships

---

### 11. Community Features

#### 11.1 Local Heroes
**User Story:** As a parent, I want to add role models from our community.

**Features:**
- Submit custom role model (with moderation)
- Write story about local hero
- Photo upload
- Trait tagging
- Private (family only) or public (community)

**Moderation:**
- All public submissions reviewed by team
- Guidelines for appropriate content
- Rejection with explanation
- Appeals process

#### 11.2 Parent Community (Optional)
**User Story:** As a parent, I want to connect with other families.

**Features:**
- Moderated forums by child age group
- Success story sharing
- Q&A with child development experts
- Monthly challenges for families

**Safety:**
- No child information shared
- Heavily moderated
- Report inappropriate content
- Parents only (verified)

---

### 12. Enhanced Content

#### 12.1 Video Stories
**User Story:** As a child, I want to watch animated stories about role models.

**Features:**
- 3-5 minute animated videos
- Professional voiceover
- Subtitles available
- Offline download (premium)

**Production:**
- Start with top 20 role models
- Expand based on popularity
- Partner with animation studios
- Multiple languages eventually

#### 12.2 Interactive Activities
**User Story:** As a child, I want to do activities in the app, not just read about them.

**Features:**
- In-app mini-games teaching traits
- Drawing/journaling tools
- Photo upload for activity proof
- Voice recording for reflections

---

### 13. Family Features

#### 13.1 Family Challenges
**User Story:** As a family, we want to work on character together.

**Features:**
- Weekly family challenges (all members participate)
- Shared progress tracking
- Family reflection prompts
- Celebration moments

**Example:**
"This week's family kindness challenge: Each family member does one kind act for another family member without being asked."

#### 13.2 Multi-Child Coordination
**User Story:** As a parent with multiple children, I want to coordinate their activities.

**Features:**
- Family dashboard view
- Suggest traits siblings can work on together
- Shared activities (when age-appropriate)
- Sibling support system ("cheer on your brother")

---

## Future Considerations

### 14. Gamification (Carefully Designed)
- Personal achievement badges (NOT competitive)
- Character trait "gardens" that grow with practice
- Unlockable content (new stories, role models)
- Avatar customization (effort-based, not comparison-based)

**Critical:** No leaderboards, no comparisons to other children

### 15. School/Organization Licenses
- Teacher dashboards
- Classroom-wide character building
- Curriculum alignment
- Bulk progress reports
- Professional development resources

### 16. Smart Home Integration
- Alexa Skill: "Tell me today's character story"
- Activity reminders via smart speakers
- Voice-based reflections

---

*Last Updated: 2026-01-15*
