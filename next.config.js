const headers = require("./headers");

module.exports = {
  // append this at the bottom of your next.config.js file
  async headers() {
    return [
      {
        source: "/(.*)",
        headers,
      },
    ];
  },
};
