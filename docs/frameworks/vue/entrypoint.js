import * as vue from 'vue';
import App      from './App.vue';

const version = document.getElementById('version');
version.innerText = `Using SmilesDrawer v${SmilesDrawer.Version} + Vue v${vue.version}`;

vue.createApp(App).mount('#root');
