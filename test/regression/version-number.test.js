import fs from 'node:fs';
import {describe, it, expect} from 'vitest';

import SmilesDrawer from '../../app.js';
import package      from '../../package.json' with {format: 'json'};
import package_lock from '../../package-lock.json' with {format: 'json'};

describe('the version number', () => {
    it('should match package.json', () => {
        expect(SmilesDrawer.Version).toEqual(package.version);
    });

    it('should match package-lock.json', () => {
        expect(SmilesDrawer.Version).toEqual(package_lock.version);
    });

    it('should match README.md', () => {
        const readme  = fs.readFileSync('README.md', 'utf8');
        const version = `Current Version: **${SmilesDrawer.Version}**`;
        expect(readme).toContain(version);
    });
});
