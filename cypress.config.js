import { defineConfig } from 'cypress'

export default defineConfig({
  watchForFileChanges: false,
  chromeWebSecurity: false,

  viewportWidth: 1280,
  viewportHeight: 720,

  pageLoadTimeout: 100000,
  defaultCommandTimeout: 30000,

  reporter: 'cypress-mochawesome-reporter',

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

    },
  },
})