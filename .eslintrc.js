module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '/src/**/*.spec.ts', // ignore test files.
    '/coverage/**/*',
    'jest.config.js',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'quotes': ['warn', 'single'],
    'indent': ['error', 2],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'padded-blocks': ['warn', {'blocks': 'always'}],
    'max-len': ['warn', {'code': 120, 'tabWidth': 4}],
    'require-jsdoc': ['warn', {
      'require': {
        'FunctionDeclaration': true,
        'MethodDefinition': true,
        'ClassDeclaration': false,
        'ArrowFunctionExpression': false,
        'FunctionExpression': true,
      },
    }],
    'eol-last': ['warn', 'always'],
  },
};
