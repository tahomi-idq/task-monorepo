// tailwind config is required for editor support

const sharedConfig = require("tailwind-config/tailwind.config.js");

console.log("---------------------", sharedConfig);

module.exports = {
  presets: [sharedConfig],
};