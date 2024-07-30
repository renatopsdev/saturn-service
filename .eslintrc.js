module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    "ecmaVersion": 12,
    project: ['./tsconfig.json']
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off'
  }
}
