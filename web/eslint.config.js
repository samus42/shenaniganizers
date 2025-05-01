import {defineConfig, globalIgnores} from 'eslint/config'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import {fixupPluginRules} from '@eslint/compat'
import globals from 'globals'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import js from '@eslint/js'
import {FlatCompat} from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

export default defineConfig([
    globalIgnores(['dist/**/*', 'src/serviceWorker.js']),
    {
        extends: compat.extends(
            'google',
            'prettier',
            'plugin:react/recommended',
            'plugin:react/jsx-runtime'
        ),

        plugins: {
            prettier,
            react,
            'react-hooks': fixupPluginRules(reactHooks)
        },

        languageOptions: {
            globals: {
                ...globals.node,
                expect: true,
                jest: true,
                beforeAll: true,
                afterAll: true
            },

            ecmaVersion: 2020,
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                    globalReturn: true
                }
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

            'func-style': [
                'error',
                'declaration',
                {
                    allowArrowFunctions: true
                }
            ],

            'new-cap': 'off',
            semi: ['error', 'never'],
            camelcase: 'off',

            'no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_'
                }
            ],

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
        }
    }
])
