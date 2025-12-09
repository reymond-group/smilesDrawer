import {defineConfig} from 'eslint/config';

// import eslint    from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tslint    from 'typescript-eslint';
import globals   from 'globals';

export default defineConfig([
    // eslint.configs.recommended,
    tslint.configs.recommended,
    stylistic.configs.recommended,
    {
        ignores: [
            'dist/',         // Automatically generated
            'doc/',          // Automatically generated
            'docs/',         // Automatically generated
            'src/Parser.js', // Automatically generated
        ],
    },
    {
        languageOptions: {
            globals: globals.browser,

            ecmaVersion: 2015,
            sourceType: 'module',

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

            // These light up way too much for now...
            // '@stylistic/semi': 'off',
            '@stylistic/semi': ['error', 'always'],

            // TODO: Re-enable these for the great whitespace revolution!
            '@stylistic/brace-style':             'off',
            '@stylistic/eol-last':                'off',
            '@stylistic/indent':                  'off', // ['error', 4],
            '@stylistic/indent-binary-ops':       'off', // ['error', 4],
            '@stylistic/key-spacing':             'off', // ['error', {align: 'value'}],
            '@stylistic/keyword-spacing':         'off',
            '@stylistic/linebreak-style':         'off', // ['error', 'unix'],
            '@stylistic/no-multiple-empty-lines': 'off',
            '@stylistic/no-tabs':                 'off',
            '@stylistic/no-trailing-spaces':      'off',
            '@stylistic/padded-blocks':           'off',
            '@stylistic/semi-spacing':            'off',
            '@stylistic/spaced-comment':          'off',

            // lakjdkjadlkasdjlkasjd
            '@stylistic/object-curly-spacing': ['error', 'never'],
            '@stylistic/space-before-function-paren': ['error', {
                anonymous:  'never',
                named:      'never',
                asyncArrow: 'always',
                catch:      'always',
            }],
        },
    },
]);
