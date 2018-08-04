import Vue from 'vue';
import './bootstrap';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import './globals';
import i18n from './i18n';


Vue.config.productionTip = false;

const vueInstance = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
