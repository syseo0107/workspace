
import { style } from '@vanilla-extract/css';
import { vars } from './tokens.css';

export const button = style({
  backgroundColor: vars.colors.primary['500'],
  padding: vars.spacing.md,
  borderRadius: vars.borderRadius.md,
  fontSize: vars.typography.fontSize.base,
});
