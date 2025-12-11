import {defineConfig} from 'eslint/config';

import stylistic from '@stylistic/eslint-plugin';
import tslint    from 'typescript-eslint';
import globals   from 'globals';

export default defineConfig([
    tslint.configs.recommended,
    stylistic.configs.recommended,
    {
        ignores: [
            'dist/',               // Automatically generated
            'doc/',                // Automatically generated
            'docs/',               // Automatically generated
            'src/Parser.js',       // Automatically generated
            'test/',               // Too many tabs
            'example/drugbank.js', // Too many tabs
        ],
    },
    {
        languageOptions: {
            globals: globals.browser,

            ecmaVersion: 2015,
            sourceType:  'module',

            parserOptions: {
                ecmaVersion: 2015,
            },
        },

        rules: {
            // For extra readability/safety...
            'no-shadow':                    'off',
            '@typescript-eslint/no-shadow': 'error',

            // TODO: Re-enable when we have real types (not just JSDoc):
            '@typescript-eslint/no-unused-vars': 'warn',

            // Aligning things improves readability!
            '@stylistic/no-multi-spaces': 'off',

            // Keep the original semicolon style...
            '@stylistic/semi': ['error', 'always'],

            // Enforce consistent indentation and line breaks...
            '@stylistic/brace-style':       ['error', 'stroustrup'],
            '@stylistic/indent':            ['error', 4],
            '@stylistic/indent-binary-ops': ['error', 4],
            '@stylistic/key-spacing':       ['error', {align: 'value'}],
            '@stylistic/linebreak-style':   ['error', 'unix'],

            // A few places where I disagree with the defaults...
            '@stylistic/object-curly-spacing':        ['error', 'never'],
            '@stylistic/space-before-function-paren': ['error', {
                anonymous:  'never',
                named:      'never',
                asyncArrow: 'always',
                catch:      'always',
            }],
        },
    },
]);
