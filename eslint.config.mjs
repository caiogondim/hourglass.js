import js from '@eslint/js'
import unicorn from 'eslint-plugin-unicorn'
import importPlugin from 'eslint-plugin-import'
import json from 'eslint-plugin-json'

export default [
  // Base recommended config
  js.configs.recommended,

  // Apply to all JS and JSON files
  {
    files: ['**/*.js', '**/*.json'],
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        // Browser globals
        console: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
        // Node.js globals
        clearTimeout: 'readonly',
        setTimeout: 'readonly',
        // Jest globals
        afterEach: 'readonly',
        beforeEach: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        it: 'readonly',
        jest: 'readonly',
        test: 'readonly',
      },
      sourceType: 'module',
    },
    plugins: {
      import: importPlugin,
      json,
      unicorn,
    },
    rules: {
      // Core ESLint rules
      'sort-keys': ['error', 'asc'],

      // Unicorn plugin rules
      ...unicorn.configs.recommended.rules,
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-array-reverse': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-at': 'off',
      'unicorn/prefer-module': 'off',

      // Import plugin rules
      'import/first': 2,
      'import/group-exports': 2,
      'import/no-default-export': 2,
      'import/no-duplicates': 2,
      'import/no-nodejs-modules': 2,
      'import/order': 2,
    },
  },

  // JSON-specific configuration
  {
    files: ['**/*.json'],
    ...json.configs.recommended,
  },
]
