/** @type { import('@storybook/react-webpack5').StorybookConfig } */
export default {
  framework: { name: '@storybook/react-webpack5', options: {} },
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-themes'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    });
    return config;
  },
};
