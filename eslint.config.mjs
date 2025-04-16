import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'module';

import { FlatCompat } from '@eslint/eslintrc';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });
const project = resolve(__dirname, 'tsconfig.json');

export default [
  ...compat.extends(
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
    'plugin:prettier/recommended'
  ),
  {
    plugins: {
      prettier: require('eslint-plugin-prettier'),
      import: require('eslint-plugin-import'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    languageOptions: { ecmaVersion: 'latest', parserOptions: { project } },
    settings: { 'import/resolver': { typescript: { project } } },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          bracketSpacing: true,
          arrowParens: 'always',
          trailingComma: 'es5',
          singleQuote: true,
          endOfLine: 'auto',
          tabWidth: 2,
          semi: true,
        },
      ],
      'import/order': [
        'warn',
        {
          groups: ['type', 'builtin', 'object', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [{ pattern: '~/**', group: 'external', position: 'after' }],
          'newlines-between': 'always',
        },
      ],
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: '*', next: ['return', 'export'] },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      'no-console': 'warn',
      'react/prop-types': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      'react/jsx-uses-react': 'off',
      '@typescript-eslint/dot-notation': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'react/self-closing-comp': 'warn',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_.*?$',
        },
      ],
    },
  },
];
