// module.exports = {
//   "stories": [
//     "../src/**/*.stories.mdx",
//     "../src/**/*.stories.@(js|jsx|ts|tsx)"
//   ],
//   "addons": [
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "@storybook/addon-interactions"
//   ],
//   "framework": {
//     "name": "@storybook/react-vite",
//     "options": {}
//   }
// }

const tsconfigPaths = require('vite-tsconfig-paths').default
// const { mergeConfig } = require('vite')
const path = require('path')
const svgrPlugin = require('vite-plugin-svgr')
const { loadEnv } = require('vite')

module.exports = {
  stories: [
    // '../src/**/*.stories.mdx',
    '../src/domain/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@storybook/addon-interactions',
    // '@storybook/addon-controls',
    // '@storybook/addon-links',
    // '@storybook/addon-essentials',
    // '@storybook/addon-interactions',
    // '@storybook/preset-create-react-app',
    // '@storybook/addon-actions',
  ],
  // webpackFinal: async (config) => ({
  //   ...config,
  //   resolve: {
  //     ...config.resolve,
  //     alias: {
  //       ...config.resolve.alias,
  //       // '@': path.resolve(__dirname, '../src/'),
  //       // '@emotion/core': toPath('node_modules/@emotion/react'),
  //     },
  //     module: [...(config.resolve.modules || []), path.resolve('./')],
  //   },
  // }),
  // viteFinal: async (config, { configType }) => {
  //   const env = loadEnv(config.mode, process.cwd())
  //   if (process.env.NODE_ENV === 'development') {
  //     config.server.host = true
  //     config.server.proxy = {
  //       '/iam': {
  //         target: env.VITE_API_URL,
  //         changeOrigin: true,
  //       },
  //       '/admin/user': {
  //         target: env.VITE_COMMERCE_MEMBER_URL,
  //         changeOrigin: true,
  //       },
  //       '/admin/category': {
  //         target: env.VITE_PRODUCT_URL,
  //         changeOrigin: true,
  //       },
  //       '^/admin/payment/.*': {
  //         target: env.VITE_PAYMENT_URL,
  //         changeOrigin: true,
  //         rewrite: (path) => path.replace(/^\/admin\/payment/, 'admin'),
  //       },
  //       '/admin': {
  //         target: env.VITE_CS_URL,
  //         changeOrigin: true,
  //       },
  //     }
  //   } else {
  //     // prod
  //     // config.build.minify = false
  //     config.build.sourcemap = false
  //   }
  //
  //   config.resolve.alias = [
  //     {
  //       find: '@',
  //       replacement: path.resolve(__dirname, '../src'),
  //     },
  //   ]
  //   config.plugins = [
  //     ...config.plugins,
  //     svgrPlugin({
  //       svgrOptions: {
  //         icon: true,
  //       },
  //     }),
  //     tsconfigPaths({
  //       projects: [path.resolve(path.dirname(__dirname), '', 'tsconfig.json')],
  //     }),
  //   ]
  //   return config
  // },
  // framework: '@storybook/react',
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // core: {
  //   builder: '@storybook/builder-vite',
  // },
  // typescript: {
  //   check: false,
  //   checkOptions: {},
  //   reactDocgen: 'react-docgen-typescript',
  //   reactDocgenTypescriptOptions: {
  //     allowSyntheticDefaultImports: false, // speeds up storybook build time
  //     esModuleInterop: false, // speeds up storybook build time
  //     shouldExtractLiteralValuesFromEnum: true, // makes union prop types like variant and size appear as select controls
  //     shouldRemoveUndefinedFromOptional: true, // makes string and boolean types that can be undefined appear as inputs and switches
  //     // propFilter: (prop) =>
  //     //   prop.parent
  //     //     ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName)
  //     //     : true,
  //   },
  // },
  // features: {
  //   storyStoreV7: true,
  //   interactionsDebugger: true, // 👈 Enable playback controls
  //   buildStoriesJson: true,
  //   // emotionAlias: false,
  // },
}
