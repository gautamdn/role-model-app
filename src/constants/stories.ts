// Sample role models and stories for the app
// In production, this would come from Supabase

export interface RoleModelData {
  id: string;
  name: string;
  title: string;
  imageEmoji: string; // Using emoji as placeholder for images
  birthYear: number | null;
  category: string;
}

export interface StoryData {
  id: string;
  roleModelId: string;
  traitId: string;
  title: string;
  subtitle: string;
  content: string[];
  keyLesson: string;
  discussionQuestions: string[];
  ageGroup: 'kids' | 'tweens' | 'teens';
  readTimeMinutes: number;
}

export const ROLE_MODELS: RoleModelData[] = [
  {
    id: 'thomas-edison',
    name: 'Thomas Edison',
    title: 'Inventor',
    imageEmoji: '💡',
    birthYear: 1847,
    category: 'Science & Innovation',
  },
  {
    id: 'marie-curie',
    name: 'Marie Curie',
    title: 'Scientist',
    imageEmoji: '🔬',
    birthYear: 1867,
    category: 'Science & Innovation',
  },
  {
    id: 'michael-jordan',
    name: 'Michael Jordan',
    title: 'Basketball Legend',
    imageEmoji: '🏀',
    birthYear: 1963,
    category: 'Sports',
  },
  {
    id: 'malala-yousafzai',
    name: 'Malala Yousafzai',
    title: 'Education Activist',
    imageEmoji: '📚',
    birthYear: 1997,
    category: 'Leadership & Activism',
  },
  {
    id: 'walt-disney',
    name: 'Walt Disney',
    title: 'Animator & Entrepreneur',
    imageEmoji: '🎬',
    birthYear: 1901,
    category: 'Arts & Entertainment',
  },
  {
    id: 'jane-goodall',
    name: 'Jane Goodall',
    title: 'Primatologist',
    imageEmoji: '🦍',
    birthYear: 1934,
    category: 'Science & Nature',
  },
  {
    id: 'rosa-parks',
    name: 'Rosa Parks',
    title: 'Civil Rights Activist',
    imageEmoji: '🚌',
    birthYear: 1913,
    category: 'Leadership & Activism',
  },
  {
    id: 'albert-einstein',
    name: 'Albert Einstein',
    title: 'Physicist',
    imageEmoji: '🧠',
    birthYear: 1879,
    category: 'Science & Innovation',
  },
];

export const STORIES: StoryData[] = [
  // Perseverance stories
  {
    id: 'edison-lightbulb',
    roleModelId: 'thomas-edison',
    traitId: 'perseverance',
    title: 'The 10,000 Tries',
    subtitle: 'How Thomas Edison never gave up on the lightbulb',
    content: [
      "Thomas Edison wanted to create something amazing - a light that could shine without fire. But it wasn't easy.",
      "He tried over and over again. His first attempt didn't work. Neither did his second, or his hundredth, or even his thousandth!",
      "Some people laughed at him. \"Give up!\" they said. \"It's impossible!\" But Thomas didn't listen to them.",
      "\"I have not failed,\" Thomas said. \"I've just found 10,000 ways that won't work.\"",
      "Finally, after years of trying, Thomas found the right material - a special kind of thread called a filament. When electricity passed through it, it glowed bright and didn't burn out quickly.",
      "The lightbulb worked! And because Thomas never gave up, we now have lights in our homes, schools, and streets all around the world.",
    ],
    keyLesson: 'Every failure is a step closer to success. Keep trying, even when things are hard.',
    discussionQuestions: [
      'Can you think of a time when you wanted to give up but kept trying?',
      'How do you think Thomas felt after his first 100 failures?',
      'What would the world be like if Thomas had given up?',
    ],
    ageGroup: 'kids',
    readTimeMinutes: 3,
  },
  {
    id: 'jordan-cut-from-team',
    roleModelId: 'michael-jordan',
    traitId: 'perseverance',
    title: 'Cut From the Team',
    subtitle: 'Michael Jordan\'s journey from rejection to greatness',
    content: [
      "Michael Jordan loved basketball more than anything. He practiced every day and dreamed of making his high school team.",
      "But when the list of players was posted, Michael's name wasn't on it. He had been cut from the team.",
      "Michael went home and cried in his room. It felt like his dream was over.",
      "But the next morning, Michael made a choice. Instead of giving up, he would work harder than ever before.",
      "He woke up at 6 AM every day to practice. He worked on his weaknesses. He pushed himself beyond what he thought was possible.",
      "The next year, Michael made the team. And he didn't stop there. He became one of the greatest basketball players in history, winning six NBA championships.",
      "\"I've failed over and over and over again in my life,\" Michael said. \"And that is why I succeed.\"",
    ],
    keyLesson: 'Rejection isn\'t the end - it can be the beginning of something even greater if you keep working hard.',
    discussionQuestions: [
      'Have you ever been told you weren\'t good enough at something?',
      'What did Michael do differently after being cut from the team?',
      'How can failure actually help us become better?',
    ],
    ageGroup: 'tweens',
    readTimeMinutes: 4,
  },
  // Curiosity stories
  {
    id: 'curie-discovery',
    roleModelId: 'marie-curie',
    traitId: 'curiosity',
    title: 'The Glowing Mystery',
    subtitle: 'How Marie Curie\'s questions changed science',
    content: [
      "Marie Curie was always asking questions. \"Why does this happen?\" \"What is that made of?\" Her curiosity never stopped.",
      "One day, Marie learned about strange rays that came from a metal called uranium. Most scientists thought they knew everything about it. But Marie wasn't satisfied.",
      "\"What if there's more to discover?\" she wondered. So she began to investigate.",
      "Marie worked in a cold, leaky shed. She had very little equipment. But she kept asking questions and doing experiments.",
      "After years of hard work, Marie discovered two new elements that no one knew existed! She named one \"polonium\" after her home country of Poland, and the other \"radium\" because it glowed.",
      "Marie's curiosity led to discoveries that helped doctors see inside the human body and treat diseases. She became the first woman to win a Nobel Prize - and then won a second one!",
    ],
    keyLesson: 'Asking questions and staying curious can lead to amazing discoveries.',
    discussionQuestions: [
      'What are you curious about? What questions do you have about the world?',
      'Why do you think Marie kept investigating when others had given up?',
      'How can asking \"why\" lead to new discoveries?',
    ],
    ageGroup: 'kids',
    readTimeMinutes: 3,
  },
  {
    id: 'goodall-chimps',
    roleModelId: 'jane-goodall',
    traitId: 'curiosity',
    title: 'The Girl Who Watched',
    subtitle: 'Jane Goodall\'s patient observation of chimpanzees',
    content: [
      "When Jane Goodall was young, she spent hours watching animals. She once sat in a henhouse for five hours just to see how a chicken laid an egg!",
      "Jane's curiosity about animals never faded. When she grew up, she traveled to Africa to study chimpanzees in the wild.",
      "At first, the chimps ran away whenever they saw her. But Jane was patient. She sat quietly, day after day, just watching from a distance.",
      "Slowly, the chimpanzees began to trust her. Jane noticed things no one had seen before. She saw chimps using sticks as tools to catch termites. She saw them hugging and kissing like humans do.",
      "Scientists had thought only humans used tools. Jane's careful observations proved them wrong!",
      "Jane spent over 60 years studying chimps. Her curiosity and patience taught the world that animals are more like us than we ever imagined.",
    ],
    keyLesson: 'Patient observation and genuine curiosity can reveal truths that others miss.',
    discussionQuestions: [
      'What animal would you like to study? What questions would you ask?',
      'Why was patience important for Jane\'s discoveries?',
      'What can we learn about ourselves by studying animals?',
    ],
    ageGroup: 'tweens',
    readTimeMinutes: 4,
  },
  // Courage stories
  {
    id: 'parks-bus',
    roleModelId: 'rosa-parks',
    traitId: 'courage',
    title: 'The Seat That Changed History',
    subtitle: 'Rosa Parks\' brave stand for equality',
    content: [
      "In 1955, there were unfair rules in parts of America. Black people had to give up their bus seats to white people. Rosa Parks knew this was wrong.",
      "One December evening, Rosa was tired after a long day of work. She sat down on the bus in the \"colored section.\" But when more white passengers got on, the bus driver told Rosa to move.",
      "Rosa thought about all the times Black people had been treated unfairly. She thought about her dignity and her rights as a human being.",
      "\"No,\" Rosa said quietly. \"I don't think I should have to stand up.\"",
      "Rosa was arrested for breaking the unfair law. But her courage inspired thousands of people to stand up for what was right.",
      "Black citizens refused to ride the buses for 381 days. Finally, the Supreme Court ruled that the bus segregation laws were wrong.",
      "Rosa's one small act of courage helped change the entire country.",
    ],
    keyLesson: 'Sometimes being brave means quietly standing up for what you believe is right, even when it\'s scary.',
    discussionQuestions: [
      'What made Rosa\'s decision so brave?',
      'Have you ever stood up for something you believed in?',
      'How can one person\'s courage inspire others?',
    ],
    ageGroup: 'tweens',
    readTimeMinutes: 4,
  },
  // Creativity stories
  {
    id: 'disney-imagination',
    roleModelId: 'walt-disney',
    traitId: 'creativity',
    title: 'The Man Who Drew Dreams',
    subtitle: 'How Walt Disney\'s imagination created magic',
    content: [
      "Walt Disney loved to draw. As a young boy, he would draw pictures of animals on the farm where he lived. He saw the world differently - full of possibilities and magic.",
      "Walt had a big dream: he wanted to make drawings come to life. He created a character named Mickey Mouse and made cartoons that made people laugh and cry.",
      "But Walt didn't stop there. \"Why not build a place where families can step inside the stories?\" he wondered.",
      "People thought he was crazy. \"An amusement park based on cartoons? It'll never work!\" they said.",
      "But Walt could see Disneyland in his imagination, even when no one else could. He designed every detail - the castle, the rides, the music playing on the streets.",
      "When Disneyland opened in 1955, millions of people came to experience Walt's dream. His imagination had created something the world had never seen before.",
      "\"If you can dream it, you can do it,\" Walt said. And he proved it was true.",
    ],
    keyLesson: 'Your imagination is powerful. The things you dream up today could become real tomorrow.',
    discussionQuestions: [
      'What would you create if you could build anything?',
      'Why do you think some people couldn\'t see Walt\'s vision?',
      'How does imagination help us solve problems?',
    ],
    ageGroup: 'kids',
    readTimeMinutes: 4,
  },
  // Leadership stories
  {
    id: 'malala-education',
    roleModelId: 'malala-yousafzai',
    traitId: 'leadership',
    title: 'The Girl Who Spoke Up',
    subtitle: 'Malala\'s fight for every child\'s right to learn',
    content: [
      "Malala Yousafzai loved going to school. She loved learning, reading books, and dreaming about her future.",
      "But in her home in Pakistan, a dangerous group called the Taliban took over. They said girls couldn't go to school anymore.",
      "Malala was only 11 years old, but she knew this was wrong. She started writing a blog about her life and speaking out about girls' education.",
      "\"How dare the Taliban take away my basic right to education?\" Malala asked.",
      "Her bravery made her a target. When Malala was 15, she was shot by a Taliban gunman on her school bus. The world held its breath.",
      "But Malala survived. And instead of being silenced, she spoke even louder.",
      "\"They thought that the bullet would silence us. But they failed,\" Malala said. \"Out of that silence came thousands of voices.\"",
      "Malala became the youngest person ever to win the Nobel Peace Prize. Today, her foundation helps girls around the world go to school.",
    ],
    keyLesson: 'True leaders speak up for others, even when it\'s dangerous. One voice can inspire millions.',
    discussionQuestions: [
      'Why was education so important to Malala?',
      'What makes someone a true leader?',
      'How can young people make a difference in the world?',
    ],
    ageGroup: 'teens',
    readTimeMinutes: 5,
  },
  // More curiosity
  {
    id: 'einstein-wonder',
    roleModelId: 'albert-einstein',
    traitId: 'curiosity',
    title: 'The Boy Who Asked Why',
    subtitle: 'How Einstein\'s questions changed how we see the universe',
    content: [
      "When Albert Einstein was five years old, his father showed him a compass. The needle always pointed north, no matter how Albert turned it.",
      "\"Why does it do that?\" Albert wondered. \"What invisible force is moving the needle?\"",
      "That simple question sparked a lifetime of curiosity. Albert never stopped asking \"why\" and \"what if.\"",
      "In school, some teachers thought Albert was a troublemaker because he asked too many questions. But Albert couldn't help it - he needed to understand how things worked.",
      "As he grew up, Albert kept asking bigger questions. \"What would it be like to ride on a beam of light?\" This strange question led him to discover that time and space work in ways no one had imagined.",
      "Albert's theories changed science forever. And it all started with a curious boy and a compass.",
      "\"I have no special talents,\" Einstein said. \"I am only passionately curious.\"",
    ],
    keyLesson: 'Stay curious and keep asking questions. The simplest \"why\" can lead to the biggest discoveries.',
    discussionQuestions: [
      'What question have you asked that adults couldn\'t answer?',
      'Why might teachers have thought Einstein was a troublemaker?',
      'How can asking \"what if\" help us discover new things?',
    ],
    ageGroup: 'tweens',
    readTimeMinutes: 4,
  },
];

// Helper functions
export function getRoleModelById(id: string): RoleModelData | undefined {
  return ROLE_MODELS.find((rm) => rm.id === id);
}

export function getStoriesByTrait(traitId: string): StoryData[] {
  return STORIES.filter((story) => story.traitId === traitId);
}

export function getStoriesByAgeGroup(ageGroup: 'kids' | 'tweens' | 'teens'): StoryData[] {
  return STORIES.filter((story) => story.ageGroup === ageGroup);
}

export function getStoryById(id: string): StoryData | undefined {
  return STORIES.find((story) => story.id === id);
}

export function getStoriesForChild(
  interests: string[],
  focusTraits: string[],
  ageGroup: 'kids' | 'tweens' | 'teens'
): StoryData[] {
  // Filter by age group first
  let filtered = STORIES.filter((story) => story.ageGroup === ageGroup);

  // If they have focus traits, prioritize those stories
  if (focusTraits.length > 0) {
    const traitStories = filtered.filter((story) =>
      focusTraits.includes(story.traitId)
    );
    if (traitStories.length > 0) {
      return traitStories;
    }
  }

  return filtered;
}

// Get age group from birth date
export function getAgeGroup(birthDate: string | null): 'kids' | 'tweens' | 'teens' {
  if (!birthDate) return 'kids'; // Default to kids

  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  if (age >= 15) return 'teens';
  if (age >= 11) return 'tweens';
  return 'kids';
}
