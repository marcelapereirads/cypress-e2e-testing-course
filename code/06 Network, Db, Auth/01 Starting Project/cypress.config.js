import { defineConfig } from 'cypress';

import { seed } from './prisma/seed-test';

export default defineConfig({
  defaultCommandTimeout: 5000,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        // this code runs out of the browser
        async seedDatabase() {
          await seed();

          // all cy.tasks need to return a value
          return null;
        }
      })
    },
  },
});
