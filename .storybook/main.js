module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  },
  webpackFinal: async (config, { configType }) => {
    config.output.publicPath = '/musician-schema-form/';
    return config;
  },
  managerWebpack: async (config) => {
    config.output.publicPath = '/musician-schema-form/';
    return config;
  },
};
