export { colors } from './colors';
export { typography, textStyles } from './typography';
export { spacing, borderRadius } from './spacing';

import { colors } from './colors';
import { typography, textStyles } from './typography';
import { spacing, borderRadius } from './spacing';

export const theme = {
  colors,
  typography,
  textStyles,
  spacing,
  borderRadius,
} as const;

export type Theme = typeof theme;
