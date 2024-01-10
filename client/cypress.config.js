const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Base url to the client
    baseUrl: 'http://localhost:3000',

    // Enabal experimental studio
    experimentalStudio: true,

    // disable scrollbehaviour to prevent weird "scroll to top" bug on . 
    // scrollBehavior: false,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
