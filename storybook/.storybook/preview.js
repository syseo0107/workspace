/** @type { import('@storybook/react-vite').Preview } */
// .storybook/preview.js
import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { lightTheme, darkTheme } from '../src/themes.js';

/* snipped for brevity */

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  }),
];

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
    // 추가 권장 설정
    backgrounds: {
      disable: true, // 테마 전환을 사용하므로 배경색 컨트롤 비활성화
    },
    docs: {
      theme: lightTheme, // 문서 페이지에서 일관된 테마 사용
    },
  },
};

export default preview;