
import { createTheme } from '@vanilla-extract/css';
import tokens from './tokens.json';

export const [themeClass, vars] = createTheme({
  colors: tokens.colors,
  spacing: tokens.spacing,
  typography: tokens.typography,
  borderRadius: tokens.borderRadius,
});
