import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
    js.configs.recommended,
    {
        ignores: [
            "dist/",    // Automatically generated
            "doc/",     // Automatically generated
            "docs/",    // Automatically generated
            "scripts/", // ESLint can't parse await at the top level...
        ]
    },
    {
        languageOptions: {
            globals: Object.assign({}, globals.browser, globals.commonjs),

            ecmaVersion: 2015,
            sourceType: "module",

            parserOptions: {
                ecmaVersion: 2015,
            },
        },

        rules: {
            "no-const-assign": "warn",
            "no-shadow": "error",
            "no-this-before-super": "warn",
            "no-undef": "warn",
            "no-unreachable": "warn",
            "no-unused-vars": "warn",
            "constructor-super": "warn",
            "valid-typeof": "warn",
        },
    }
]);