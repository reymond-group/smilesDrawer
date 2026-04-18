import {defineConfig} from 'vitest/config';

const excludeManual = process.env.VITEST_MANUAL !== '1';

export default defineConfig({
    test: {
        include: ['test/**/*.test.js'],
        exclude: [
            '**/node_modules/**',
            ...(excludeManual ? ['test/manual/**'] : []),
        ],
    },
});
