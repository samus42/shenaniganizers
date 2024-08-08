module.exports = {
    env: {
        node: true
    },
    extends: ['google', 'prettier', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
    plugins: ['prettier', 'react', 'react-hooks'],
    ignorePatterns: ["package/*"],
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
        'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
        'new-cap': [
            'error',
            {
                newIsCap: true,
                capIsNew: true
            }
        ],
        'new-cap': 'off',
        semi: ['error', 'never'],
        camelcase: 'off',
        'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
        'react/prop-types': 'off',
        'react/prefer-stateless-function': 'off',
        'react/jsx-indent-props': ['error', 4],
        'jsx-a11y/anchor-is-valid': 'off',
        'react/no-multi-comp': 'off',
        'react/jsx-no-useless-fragment': 'off',
        'react/state-in-constructor': 'off',
        'react/sort-comp': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'off',
        'react/jsx-indent': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/destructuring-assignment': 'off',
        'jsx-one-expression-per-line': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/function-component-definition': 'off',
        'react/require-default-props': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off'
    },
    globals: {
        expect: true,
        jest: true,
        beforeAll: true,
        afterAll: true
    },
    ignorePatterns: ['dist/**', 'src/serviceWorker.js']
}
