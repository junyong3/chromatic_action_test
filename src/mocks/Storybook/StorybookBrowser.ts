import { setupWorker } from 'msw'
import { StorybookMockAPIList } from '@mocks/Storybook/handlers'

// This configures a Service Worker with the given request example.
export const workerMockStorybook = setupWorker(...StorybookMockAPIList)
workerMockStorybook.start({
  onUnhandledRequest: 'bypass',
})
