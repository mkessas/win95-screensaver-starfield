module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:security/recommended',
    'plugin:prettier/recommended',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    'require': true,
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': { 'jsx': true },
    'ecmaVersion': 6,
    'sourceType': 'module',
    'project': './tsconfig.eslint.json',
  },
  'plugins': ['react', '@typescript-eslint', 'security', 'prettier'],
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'rules': {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'interface', format: ['PascalCase'], prefix: ['I'] },
      { selector: 'typeAlias', format: ['PascalCase'], prefix: ['T'] },
    ],
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        'allow': ['arrowFunctions'],
      },
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/prop-types': 'off',
    'no-prototype-builtins': 'off',
    'prettier/prettier': 'error',
  },
  'overrides': [
    {
      'files': ['*.js', '*.ts', '*.tsx'],
      'rules': {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/prop-types': 'warn',
      },
    },
    {
      'files': ['*.tsx'],
      'rules': {
        'react/prop-types': 'off',
      },
    },
  ],
  'ignorePatterns': ['/stories/*'],
};
