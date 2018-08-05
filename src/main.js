import Vue from 'vue'; // собственно сам фреймворк
import './bootstrap'; // раличные плагины и пакеты для vuejs
import App from './App.vue'; // компонент - точка входа
import router from './router'; // роутер
import store from './store/store'; // хранилище vuex
import './registerServiceWorker'; // ???
import './globals'; // глобальные настройки
import i18n from './i18n'; // языковой файл
Vue.config.productionTip = false;
const vueInstance = new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
//# sourceMappingURL=main.js.map