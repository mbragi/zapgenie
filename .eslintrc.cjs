module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  ignorePatterns: [
    'dist/**/*',
    'node_modules/**/*',
    '*.js',
    '*.cjs',
    '*.mjs',
    '*.d.ts',
    '.test.ts',
    'test',
    'tests/**/*',
  ],
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    '@typescript-eslint/no-misused-promises': 'off', // Disable this rule for now
    '@typescript-eslint/no-explicit-any': 'off', // Change to warn instead of error
    '@typescript-eslint/no-unused-vars': 'warn', //true
    'no-case-declarations': 'off', // Disable case declaration rule
  },
};
