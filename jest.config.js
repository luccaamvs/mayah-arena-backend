/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts"
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    '.+\.ts$': 'ts-jest'
  }
};


module.exports = config;