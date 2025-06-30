const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return {
        baseUrl: "http://localhost:3000", // Puerto por defecto de Vite, ajústalo si usas otro
        specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
        supportFile: "cypress/support/e2e.js",
      };
    },
  },
});
