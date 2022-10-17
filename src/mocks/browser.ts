import { setupWorker } from 'msw'
import { mockAPiList } from '@mocks/handlers'

// This configures a Service Worker with the given request example.
if (
  import.meta.env.MODE === 'development' &&
  import.meta.env.VITE_IS_MOCK === 'true'
) {
  // void setupWorker(...mockAPiList).start()
  const mswWorker = setupWorker(...mockAPiList)
  mswWorker.start({
    onUnhandledRequest: 'bypass',
  })
}
