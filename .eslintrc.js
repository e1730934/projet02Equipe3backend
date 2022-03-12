module.exports = {
    root: true,
    env: {
        node: true,
        jest: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:jest/recommended',
    ],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-alert': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['warn', 4],
    },
};
