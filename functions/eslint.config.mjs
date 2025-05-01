import {defineConfig} from 'eslint/config'
import prettier from 'eslint-plugin-prettier'
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
    {
        extends: compat.extends('google', 'prettier'),

        plugins: {
            prettier
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

            'no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_'
                }
            ]
        }
    }
])
