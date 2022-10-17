import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
Sentry.init({
  dsn: 'https://35e132526a2c483bb9930a47d028e1c1@o403090.ingest.sentry.io/6575307',
  integrations: [
    new BrowserTracing(),
    new Sentry.Integrations.Breadcrumbs({
      console: false,
      dom: true,
      fetch: true,
      history: true,
      sentry: false,
      xhr: true,
    }),
  ],
  release: '1.0',
  environment: import.meta.env.PROD ? 'production' : 'development',
  normalizeDepth: 5,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  enabled: import.meta.env.PROD,
  tracesSampleRate: 1, // 0에서 1 사이의 숫자로 주어진 트랜잭션이 Sentry로 전송 될 확률을 제어
})
