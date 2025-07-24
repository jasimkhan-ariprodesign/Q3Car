// module.exports = {
//   root: true,
//   extends: '@react-native',
//   rule: {
//     // TypeScript rules
//     '@typescript-eslint/no-unused-vars': 'warn',
//   }
// };

module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['@typescript-eslint'],
  rules: {
    // TypeScript rules
    '@typescript-eslint/no-unused-vars': 'warn',

    // ✅ Padding between blocks
    'padding-line-between-statements': [
      'none',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'const', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
    ],
  },
};
