const tsconfigPaths = require('vite-tsconfig-paths').default
// const { mergeConfig } = require('vite')
const path = require('path')
const svgrPlugin = require('vite-plugin-svgr')
const { loadEnv } = require('vite')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    // '@storybook/addon-controls',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // '@storybook/addon-actions',
  ],
  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        // '@': path.resolve(__dirname, '../src/'),
        // '@emotion/core': toPath('node_modules/@emotion/react'),
      },
    },
  }),
  viteFinal: async (config, { configType }) => {
    const env = loadEnv(config.mode, process.cwd())
    if (process.env.NODE_ENV === 'development') {
      config.server.host = true
      config.server.proxy = {
        '/iam': {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
        '/admin': {
          target: env.VITE_CS_URL,
          changeOrigin: true,
        },
      }
    }

    config.resolve.alias = [
      {
        find: '@',
        replacement: path.resolve(__dirname, '../src'),
      },
    ]
    config.plugins = [
      ...config.plugins,
      svgrPlugin({
        svgrOptions: {
          icon: true,
        },
      }),
      tsconfigPaths({
        projects: [path.resolve(path.dirname(__dirname), '', 'tsconfig.json')],
      }),
    ]
    return config
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    // storyStoreV7: true,
    // emotionAlias: false,
  },
}
