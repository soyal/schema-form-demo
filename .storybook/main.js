const publicPath = '/musician-schema-form/'

module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  },
  webpackFinal: async (config, { configType }) => {
    config.output.publicPath = publicPath;
    return config;
  },
  managerWebpack: async (config) => {


    configHtmlWebPackPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin'
    );
    configHtmlWebPackPlugin.options.publicPath = publicPath;
    config.output.publicPath = publicPath;
    const oriTemplateParameters =
      configHtmlWebPackPlugin.options.templateParameters;
    configHtmlWebPackPlugin.options.templateParameters = (
      compilation,
      files,
      options
    ) => {
      oriReturn = oriTemplateParameters(compilation, files, options);
      oriReturn.globals.PREVIEW_URL = `${publicPath}iframe.html`;
      return oriReturn;
    };

    return config;
  },
};
