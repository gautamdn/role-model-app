import { colors } from '../theme';

export interface CharacterTrait {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  // Interests that relate to this trait
  relatedInterests: string[];
  // Example role models for this trait
  exampleRoleModels: string[];
}

export const CHARACTER_TRAITS: CharacterTrait[] = [
  {
    id: 'perseverance',
    name: 'Perseverance',
    description: 'Never giving up, even when things get hard',
    emoji: '💪',
    color: colors.traits.perseverance,
    relatedInterests: ['soccer', 'basketball', 'swimming', 'gymnastics', 'martial_arts', 'puzzles'],
    exampleRoleModels: ['Thomas Edison', 'J.K. Rowling', 'Michael Jordan'],
  },
  {
    id: 'kindness',
    name: 'Kindness',
    description: 'Being caring and helpful to others',
    emoji: '💝',
    color: colors.traits.kindness,
    relatedInterests: ['animals', 'nature', 'cooking', 'crafts'],
    exampleRoleModels: ['Mother Teresa', 'Fred Rogers', 'Princess Diana'],
  },
  {
    id: 'creativity',
    name: 'Creativity',
    description: 'Using imagination to create something new',
    emoji: '🎨',
    color: colors.traits.creativity,
    relatedInterests: ['drawing', 'music', 'writing', 'crafts', 'theater', 'photography', 'lego'],
    exampleRoleModels: ['Leonardo da Vinci', 'Walt Disney', 'Frida Kahlo'],
  },
  {
    id: 'leadership',
    name: 'Leadership',
    description: 'Guiding and inspiring others',
    emoji: '👑',
    color: colors.traits.leadership,
    relatedInterests: ['soccer', 'basketball', 'martial_arts', 'theater'],
    exampleRoleModels: ['Martin Luther King Jr.', 'Malala Yousafzai', 'Nelson Mandela'],
  },
  {
    id: 'discipline',
    name: 'Discipline',
    description: 'Practicing self-control and staying focused',
    emoji: '🎯',
    color: colors.traits.discipline,
    relatedInterests: ['swimming', 'gymnastics', 'martial_arts', 'music', 'dancing'],
    exampleRoleModels: ['Simone Biles', 'Yo-Yo Ma', 'Serena Williams'],
  },
  {
    id: 'curiosity',
    name: 'Curiosity',
    description: 'Always wanting to learn and discover new things',
    emoji: '🔍',
    color: colors.traits.curiosity,
    relatedInterests: ['science', 'space', 'nature', 'animals', 'technology', 'dinosaurs', 'reading'],
    exampleRoleModels: ['Marie Curie', 'Albert Einstein', 'Jane Goodall'],
  },
  {
    id: 'courage',
    name: 'Courage',
    description: 'Being brave even when scared',
    emoji: '🦁',
    color: colors.traits.courage,
    relatedInterests: ['martial_arts', 'gymnastics', 'swimming', 'space'],
    exampleRoleModels: ['Rosa Parks', 'Neil Armstrong', 'Harriet Tubman'],
  },
  {
    id: 'integrity',
    name: 'Integrity',
    description: 'Always doing the right thing, even when no one is watching',
    emoji: '⭐',
    color: colors.traits.integrity,
    relatedInterests: ['reading', 'board_games', 'nature'],
    exampleRoleModels: ['Abraham Lincoln', 'Ruth Bader Ginsburg', 'Mahatma Gandhi'],
  },
];

// Map interest IDs to trait IDs
export function getTraitsForInterests(interests: string[]): CharacterTrait[] {
  const traitScores = new Map<string, number>();

  interests.forEach((interest) => {
    CHARACTER_TRAITS.forEach((trait) => {
      if (trait.relatedInterests.includes(interest)) {
        const currentScore = traitScores.get(trait.id) || 0;
        traitScores.set(trait.id, currentScore + 1);
      }
    });
  });

  // Sort by score descending and return traits
  return CHARACTER_TRAITS.filter((trait) => traitScores.has(trait.id)).sort(
    (a, b) => (traitScores.get(b.id) || 0) - (traitScores.get(a.id) || 0)
  );
}

// Get the top N recommended traits based on interests
export function getRecommendedTraits(
  interests: string[],
  count: number = 3
): CharacterTrait[] {
  return getTraitsForInterests(interests).slice(0, count);
}

// Get trait by ID
export function getTraitById(id: string): CharacterTrait | undefined {
  return CHARACTER_TRAITS.find((trait) => trait.id === id);
}
