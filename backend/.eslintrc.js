module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "plugin:node/recommended"],
  plugins: ["jest"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "node/no-unpublished-require": 0,
    "node/no-missing-require": 0,
  },
};
