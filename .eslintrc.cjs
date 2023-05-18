module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'eslint:recommended', 'plugin:storybook/recommended', 'prettier', 'plugin:storybook/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', "storybook", "prettier"],
  rules: {
    "prettier/prettier": "error"
  }
};