// Sample activities for character development
// In production, this would come from Supabase

export interface ActivityData {
  id: string;
  traitId: string;
  title: string;
  description: string;
  emoji: string;
  instructions: string[];
  materials: string[];
  tips: string[];
  reflectionPrompts: string[];
  estimatedMinutes: number;
  difficulty: 1 | 2 | 3; // 1=easy, 2=medium, 3=challenging
  ageGroup: 'kids' | 'tweens' | 'teens';
  category: 'creative' | 'physical' | 'social' | 'mindful' | 'learning';
}

export const ACTIVITIES: ActivityData[] = [
  // Perseverance activities
  {
    id: 'puzzle-challenge',
    traitId: 'perseverance',
    title: 'The Puzzle Challenge',
    description: 'Complete a challenging puzzle without giving up, even when it gets hard.',
    emoji: '🧩',
    instructions: [
      'Choose a puzzle that looks challenging (but not impossible!)',
      'Set a timer for 20 minutes',
      'Work on the puzzle without looking at the solution',
      'If you get stuck, take 3 deep breaths and try a different approach',
      'Keep going until the timer ends, even if you don\'t finish',
    ],
    materials: ['A puzzle (jigsaw, Rubik\'s cube, or brain teaser)', 'Timer'],
    tips: [
      'Start with the edges or corners',
      'Group similar pieces together',
      'It\'s okay to feel frustrated - that\'s part of learning!',
    ],
    reflectionPrompts: [
      'How did you feel when you got stuck?',
      'What helped you keep going?',
      'Did you try any new strategies?',
    ],
    estimatedMinutes: 20,
    difficulty: 2,
    ageGroup: 'kids',
    category: 'learning',
  },
  {
    id: 'practice-journal',
    traitId: 'perseverance',
    title: 'Practice Makes Progress',
    description: 'Track your improvement in a skill by practicing every day for a week.',
    emoji: '📈',
    instructions: [
      'Choose a skill you want to improve (drawing, sports, music, etc.)',
      'Practice for 10-15 minutes every day',
      'Write down one thing you learned each day',
      'Notice how you improve over the week',
      'Celebrate your progress at the end!',
    ],
    materials: ['A notebook or journal', 'Materials for your chosen skill'],
    tips: [
      'Pick something you enjoy but find challenging',
      'Small improvements count!',
      'Take photos or videos to see your progress',
    ],
    reflectionPrompts: [
      'What was the hardest part of practicing every day?',
      'How did your skill change from day 1 to day 7?',
      'What would you tell someone who wants to quit?',
    ],
    estimatedMinutes: 15,
    difficulty: 2,
    ageGroup: 'tweens',
    category: 'learning',
  },

  // Kindness activities
  {
    id: 'kindness-notes',
    traitId: 'kindness',
    title: 'Secret Kindness Notes',
    description: 'Write encouraging notes and hide them for family members to find.',
    emoji: '💌',
    instructions: [
      'Get some small pieces of paper or sticky notes',
      'Think of something nice about each family member',
      'Write a short, encouraging message for each person',
      'Hide the notes where they\'ll find them (lunchbox, pillow, mirror)',
      'Watch their reactions when they discover the notes!',
    ],
    materials: ['Paper or sticky notes', 'Markers or pens', 'Optional: stickers'],
    tips: [
      'Be specific about what you appreciate',
      'Decorate the notes to make them special',
      'You can do this for friends or teachers too!',
    ],
    reflectionPrompts: [
      'How did it feel to write kind words?',
      'How did people react when they found the notes?',
      'When has someone\'s kind words helped you?',
    ],
    estimatedMinutes: 15,
    difficulty: 1,
    ageGroup: 'kids',
    category: 'creative',
  },
  {
    id: 'helping-hands',
    traitId: 'kindness',
    title: 'Helping Hands Challenge',
    description: 'Do three helpful things for others without being asked.',
    emoji: '🤝',
    instructions: [
      'Look around and notice what needs to be done',
      'Choose three helpful actions you can do today',
      'Do them without being asked or expecting anything in return',
      'Keep it a secret if you can!',
      'Notice how helping others makes you feel',
    ],
    materials: ['Just yourself and a helpful attitude!'],
    tips: [
      'Look for small things: picking up trash, holding doors, carrying groceries',
      'Help can be doing chores someone else usually does',
      'A helping hand can also be listening when someone needs to talk',
    ],
    reflectionPrompts: [
      'What three things did you do?',
      'How did the people you helped react?',
      'How did helping others change your day?',
    ],
    estimatedMinutes: 30,
    difficulty: 1,
    ageGroup: 'kids',
    category: 'social',
  },

  // Creativity activities
  {
    id: 'story-starter',
    traitId: 'creativity',
    title: 'Finish the Story',
    description: 'Create an ending for an unfinished story using your imagination.',
    emoji: '📝',
    instructions: [
      'Read this story starter: "The old wooden box had been sitting in the attic for 100 years. When Maya finally opened it, she couldn\'t believe what was inside..."',
      'Let your imagination run wild - what was in the box?',
      'Write or draw what happens next',
      'Create at least 3 different possible endings',
      'Share your favorite ending with someone',
    ],
    materials: ['Paper', 'Pencils, pens, or markers'],
    tips: [
      'There are no wrong answers in creativity!',
      'The more unusual the idea, the better',
      'You can combine ideas from different stories you know',
    ],
    reflectionPrompts: [
      'Which ending was your favorite and why?',
      'Where did your ideas come from?',
      'How does it feel to create something from your imagination?',
    ],
    estimatedMinutes: 20,
    difficulty: 1,
    ageGroup: 'kids',
    category: 'creative',
  },
  {
    id: 'inventor-challenge',
    traitId: 'creativity',
    title: 'Inventor\'s Workshop',
    description: 'Design an invention that solves a real problem in your life.',
    emoji: '💡',
    instructions: [
      'Think about a small problem you have every day',
      'Brainstorm at least 5 possible solutions',
      'Choose your best idea and draw a detailed design',
      'Label all the parts and explain how it works',
      'Give your invention a creative name',
    ],
    materials: ['Paper', 'Colored pencils or markers', 'Optional: craft supplies to build a prototype'],
    tips: [
      'No idea is too silly!',
      'Great inventions often combine existing ideas in new ways',
      'Think about how real inventors would solve this problem',
    ],
    reflectionPrompts: [
      'What problem does your invention solve?',
      'How did you come up with your best idea?',
      'If you could actually build it, what would you need?',
    ],
    estimatedMinutes: 30,
    difficulty: 2,
    ageGroup: 'tweens',
    category: 'creative',
  },

  // Curiosity activities
  {
    id: 'question-collector',
    traitId: 'curiosity',
    title: 'Question Collector',
    description: 'Collect 10 interesting questions about the world and find answers to 3 of them.',
    emoji: '❓',
    instructions: [
      'Carry a small notebook for one day',
      'Write down every question that pops into your head',
      'Try to collect at least 10 questions',
      'Choose the 3 most interesting questions',
      'Research the answers (books, internet, asking experts)',
    ],
    materials: ['Small notebook', 'Pen', 'Access to books or internet for research'],
    tips: [
      'Questions can be about anything: nature, space, history, people',
      'Don\'t judge your questions - write them all down',
      'Some of the best discoveries came from "silly" questions',
    ],
    reflectionPrompts: [
      'What was your favorite question?',
      'Were you surprised by any of the answers?',
      'What new questions did your research create?',
    ],
    estimatedMinutes: 45,
    difficulty: 2,
    ageGroup: 'tweens',
    category: 'learning',
  },
  {
    id: 'nature-detective',
    traitId: 'curiosity',
    title: 'Nature Detective',
    description: 'Explore outdoors and observe nature like a scientist.',
    emoji: '🔍',
    instructions: [
      'Go outside to a park, backyard, or any natural area',
      'Sit quietly for 5 minutes and just observe',
      'Find 5 interesting things in nature',
      'Draw or describe each thing in detail',
      'Ask questions about what you observe',
    ],
    materials: ['Notebook', 'Pencil', 'Optional: magnifying glass'],
    tips: [
      'Look up, down, and all around',
      'Notice small things: insects, patterns on leaves, animal tracks',
      'Use all your senses: what do you hear and smell?',
    ],
    reflectionPrompts: [
      'What was the most surprising thing you found?',
      'What questions do you have about what you observed?',
      'How is nature different when you really pay attention?',
    ],
    estimatedMinutes: 30,
    difficulty: 1,
    ageGroup: 'kids',
    category: 'learning',
  },

  // Courage activities
  {
    id: 'brave-challenge',
    traitId: 'courage',
    title: 'Small Brave Steps',
    description: 'Do one small thing that scares you a little bit.',
    emoji: '🦁',
    instructions: [
      'Think of something small that makes you nervous',
      'It could be: talking to someone new, trying a new food, raising your hand in class',
      'Take three deep breaths to calm your nerves',
      'Do the brave thing!',
      'Celebrate your courage, no matter what happens',
    ],
    materials: ['Just yourself and some courage!'],
    tips: [
      'Start small - courage grows with practice',
      'It\'s okay to feel scared AND do it anyway',
      'Having a friend nearby can help',
    ],
    reflectionPrompts: [
      'What brave thing did you do?',
      'How did you feel before, during, and after?',
      'Would you do it again?',
    ],
    estimatedMinutes: 15,
    difficulty: 2,
    ageGroup: 'kids',
    category: 'social',
  },
  {
    id: 'voice-practice',
    traitId: 'courage',
    title: 'Find Your Voice',
    description: 'Practice speaking up by sharing your opinion on something that matters to you.',
    emoji: '🎤',
    instructions: [
      'Think of something you care about (environment, fairness, a cause)',
      'Write down 3 reasons why it matters to you',
      'Practice saying it out loud',
      'Share your thoughts with a family member or friend',
      'Ask them what they think too',
    ],
    materials: ['Paper for notes', 'A willing listener'],
    tips: [
      'It\'s okay to read from your notes at first',
      'Speaking up gets easier with practice',
      'Your opinion matters, even if others disagree',
    ],
    reflectionPrompts: [
      'What topic did you choose and why?',
      'How did it feel to share your opinion?',
      'Did the conversation teach you anything new?',
    ],
    estimatedMinutes: 20,
    difficulty: 2,
    ageGroup: 'tweens',
    category: 'social',
  },

  // Discipline activities
  {
    id: 'morning-routine',
    traitId: 'discipline',
    title: 'Morning Champion',
    description: 'Create and follow a morning routine for 5 days in a row.',
    emoji: '🌅',
    instructions: [
      'Write down 5 things you want to do every morning',
      'Put them in order from first to last',
      'Make a checklist you can use each day',
      'Follow your routine for 5 days',
      'Check off each task as you complete it',
    ],
    materials: ['Paper for checklist', 'Pen or markers', 'Optional: stickers for rewards'],
    tips: [
      'Keep it simple - 5 things is plenty',
      'Include things you enjoy, not just chores',
      'Put your checklist somewhere you\'ll see it',
    ],
    reflectionPrompts: [
      'Which day was the hardest? Which was easiest?',
      'How did having a routine change your morning?',
      'What routine would you like to keep doing?',
    ],
    estimatedMinutes: 10,
    difficulty: 2,
    ageGroup: 'kids',
    category: 'mindful',
  },
  {
    id: 'focus-time',
    traitId: 'discipline',
    title: 'Focus Power Hour',
    description: 'Practice deep focus by working on one task without distractions.',
    emoji: '🎯',
    instructions: [
      'Choose one important task (homework, project, practice)',
      'Remove all distractions (phone away, quiet space)',
      'Set a timer for 25 minutes',
      'Work ONLY on that one task until the timer ends',
      'Take a 5-minute break, then repeat if needed',
    ],
    materials: ['Timer', 'Your task materials', 'A quiet space'],
    tips: [
      'If a distraction pops in your head, write it down and return to your task',
      'This technique is called the "Pomodoro Method"',
      'Short, focused work beats long, distracted work',
    ],
    reflectionPrompts: [
      'How much did you accomplish in focused time vs. regular time?',
      'What was the hardest distraction to resist?',
      'How did it feel to fully focus?',
    ],
    estimatedMinutes: 30,
    difficulty: 2,
    ageGroup: 'tweens',
    category: 'mindful',
  },

  // Leadership activities
  {
    id: 'teach-something',
    traitId: 'leadership',
    title: 'Be the Teacher',
    description: 'Teach someone something you know how to do.',
    emoji: '👨‍🏫',
    instructions: [
      'Think of something you\'re good at',
      'Find someone who wants to learn it',
      'Break it down into simple steps',
      'Teach them patiently, step by step',
      'Celebrate when they learn!',
    ],
    materials: ['Whatever you need for your skill', 'A willing student'],
    tips: [
      'Teaching helps YOU understand things better too',
      'Be patient - remember when you were learning',
      'Encourage and praise their efforts',
    ],
    reflectionPrompts: [
      'What did you teach?',
      'What was the hardest part to explain?',
      'What did you learn about being a good teacher?',
    ],
    estimatedMinutes: 30,
    difficulty: 2,
    ageGroup: 'tweens',
    category: 'social',
  },

  // Integrity activities
  {
    id: 'honesty-day',
    traitId: 'integrity',
    title: 'Radical Honesty Day',
    description: 'Practice being completely honest for one whole day.',
    emoji: '⭐',
    instructions: [
      'Commit to being honest all day - in kind ways',
      'If someone asks your opinion, give it honestly but kindly',
      'If you make a mistake, admit it right away',
      'If you don\'t know something, say "I don\'t know"',
      'Notice how honesty affects your day',
    ],
    materials: ['Just your commitment to honesty'],
    tips: [
      'Honesty doesn\'t mean being mean - be kind AND honest',
      'It\'s okay to say "I\'d rather not answer"',
      'Notice when you\'re tempted to stretch the truth',
    ],
    reflectionPrompts: [
      'Was being honest harder or easier than you expected?',
      'How did people react to your honesty?',
      'When was it hardest to be honest?',
    ],
    estimatedMinutes: 0, // All day activity
    difficulty: 3,
    ageGroup: 'tweens',
    category: 'social',
  },
];

// Helper functions
export function getActivityById(id: string): ActivityData | undefined {
  return ACTIVITIES.find((activity) => activity.id === id);
}

export function getActivitiesByTrait(traitId: string): ActivityData[] {
  return ACTIVITIES.filter((activity) => activity.traitId === traitId);
}

export function getActivitiesByAgeGroup(ageGroup: 'kids' | 'tweens' | 'teens'): ActivityData[] {
  return ACTIVITIES.filter((activity) => activity.ageGroup === ageGroup);
}

export function getActivitiesForChild(
  focusTraits: string[],
  ageGroup: 'kids' | 'tweens' | 'teens'
): ActivityData[] {
  // Filter by age group first
  let filtered = ACTIVITIES.filter(
    (activity) => activity.ageGroup === ageGroup || activity.ageGroup === 'kids'
  );

  // If they have focus traits, prioritize those activities
  if (focusTraits.length > 0) {
    const traitActivities = filtered.filter((activity) =>
      focusTraits.includes(activity.traitId)
    );
    if (traitActivities.length > 0) {
      return traitActivities;
    }
  }

  return filtered;
}
