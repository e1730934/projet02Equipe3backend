module.exports = {
    root: true,
    env: {
        node: true,
        jest: true,
        browser: true,
        es2020: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:jest/recommended',
    ],
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 12,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-alert': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['warn', 4],
    },
};
