module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'eslint-plugin-simple-import-sort'],
  rules: {
    '@typescript-eslint/no-shadow': ['error'],
    'no-shadow': 'off',
    'no-undef': 'off',
    'react/react-in-jsx-scope': 0,
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-use-before-define': 'off',
    'newline-before-return': ['error'],
    'react-hooks/exhaustive-deps': 0,
    'react/function-component-definition': 0,
    'arrow-body-style': [1, 'as-needed'],
    'object-curly-spacing': ['error', 'always'],
    'eslint-disable-next-line': 'off',
    'prettier/prettier': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react$', '^react-native', '^expo', '^@', '^navigators', '^screens', '^[a-z]'],
          // Imports starting with `../`
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Imports starting with `./`
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Side effect imports
          ['^\\u0000'],
        ],
      },
    ],
  },
};
