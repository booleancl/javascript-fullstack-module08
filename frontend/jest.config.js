module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    "^@fixturesDir/(.*)$": "<rootDir>/../fixtures/$1"
  }
}
