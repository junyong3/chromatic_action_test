import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'ct41tj',
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      on('task', {
        generateOTP: require('cypress-otp'),
      })
    },
  },
  env: {},
})
