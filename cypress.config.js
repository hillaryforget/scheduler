const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "u7wkbt",
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "http://localhost:8000",
  },
});
