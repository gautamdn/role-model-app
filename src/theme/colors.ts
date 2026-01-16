export const colors = {
  // Primary brand colors
  primary: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50', // Main primary
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },

  // Secondary/accent colors
  secondary: {
    50: '#FFF3E0',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',
    500: '#FF9800', // Main secondary
    600: '#FB8C00',
    700: '#F57C00',
    800: '#EF6C00',
    900: '#E65100',
  },

  // Character trait colors
  traits: {
    perseverance: '#5C6BC0', // Indigo
    kindness: '#EC407A',     // Pink
    creativity: '#AB47BC',   // Purple
    leadership: '#42A5F5',   // Blue
    discipline: '#26A69A',   // Teal
    curiosity: '#FFA726',    // Orange
    courage: '#EF5350',      // Red
    integrity: '#66BB6A',    // Green
  },

  // Neutral colors
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Semantic colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    tertiary: '#EEEEEE',
  },

  // Text colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#9E9E9E',
    inverse: '#FFFFFF',
  },
} as const;

export type Colors = typeof colors;
