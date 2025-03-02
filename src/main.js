import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.config.productionTip = false;  // for Vue 3
app.mount('#app');
