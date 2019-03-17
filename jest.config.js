// const { pathsToModuleNameMapper } = require('ts-jest')
const { tsConfig } = require('./tsconfig.dev.json');

module.exports = {
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  transform: {
    "\\.(ts|tsx)$": "ts-jest"
  },
  testRegex: ".*\\.(spec|test)\\.(t|j)sx?$",
  setupFiles: [
    "<rootDir>/tests-shim.js",
    "<rootDir>/tests-setup.js"
  ],
  snapshotSerializers: ["enzyme-to-json"],
  globals: {
    "ts-jest": {
      tsConfig: '<rootDir>/tsconfig.dev.json'
    }
  },
  roots: ["<rootDir>/src/"]
};
