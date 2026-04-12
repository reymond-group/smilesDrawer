import {mount} from 'svelte';
import App     from './App.svelte';

// Show version numbers in the header.
// The SVELTE_VERSION variable is injected as part of the build process (to reduce file size).
// See https://github.com/sveltejs/svelte/discussions/14903 for details.
const version = document.getElementById('version');
version.innerText = `Using SmilesDrawer v${SmilesDrawer.Version} + Svelte v${SVELTE_VERSION}`;

const root = document.getElementById('root');
mount(App, {target: root});
