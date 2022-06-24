import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index.js';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import './assets/css/font.css';
import './assets/css/style.css';
import './assets/css/responsives.css';

const app = createApp(App);

app.use(Quasar, quasarUserOptions);
app.use(store)
app.use(router)
app.mount('#app');