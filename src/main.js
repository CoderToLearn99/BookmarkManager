import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.config.productionTip = false;  // for Vue 3
app.use(router);
app.mount('#app');
