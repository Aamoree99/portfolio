import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Импорт Vuex store
import router from './router/router';

createApp(App)
  .use(store) // Используйте store в вашем приложении
  .use(router)
  .mount('#app');
