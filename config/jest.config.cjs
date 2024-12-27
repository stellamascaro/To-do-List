module.exports = {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
  testEnvironment: "jest-environment-jsdom",
};
