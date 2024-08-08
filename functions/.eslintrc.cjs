module.exports = {
    env: {
        node: true
    },
    extends: ['google', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true,
            globalReturn: true
        }
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        'prettier/prettier': 'error',
        'object-curly-newline': [
            'error',
            {
                consistent: true
            }
        ],
        'eol-last': 'off',
        'max-len': ['error', 250],
        'require-jsdoc': 'off',
        'valid-jsdoc': 'off',
        'func-style': ['error', 'declaration', {allowArrowFunctions: true}],
        'new-cap': 'off',
        semi: ['error', 'never'],
        'no-unused-vars': ['error', {varsIgnorePattern: '^_', argsIgnorePattern: '^_'}]
    },
    globals: {
        expect: true,
        jest: true,
        beforeAll: true,
        afterAll: true
    }
}
