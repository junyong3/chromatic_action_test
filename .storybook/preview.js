import instance from 'timemachine'
import { configure } from '@testing-library/dom'
import { StorybookApp } from './StorybookApp'

// testing
configure({ testIdAttribute: 'data-cy' })
// date
instance.config({
  dateString: '2022-10-28',
})
const DefaultViewport = {
  defaultResolution: {
    name: 'default HD',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
}
const customViewports = {
  detailView: {
    type: 'desktop',
    name: 'detailView',
    styles: {
      width: '1440px',
      height: '100%',
    },
  },
  temp: {
    name: 'temp',
    styles: {
      width: '533px',
      height: '801px',
    },
  },
}
export const globalTypes = {
  theme: {
    name: 'Theme',
    title: 'Theme',
    description: 'Theme components',
    defaultValue: 'light',
    // toolbar: {
    //   icon: 'paintbrush',
    //   dynamicTitle: true,
    //   items: [
    //     { value: 'light', left: '☀️', title: 'Light mode' },
    //     { value: 'dark', left: '🌙', title: 'Dark mode' },
    //   ],
    // },
  },
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: {
      ...DefaultViewport,
      ...customViewports,
    },
  },
  controls: {
    expand: true,
    // hideNoControlsWarning: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [StorybookApp]
