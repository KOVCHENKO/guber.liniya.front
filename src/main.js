import Vue from 'vue'; // собственно сам фреймворк
import './bootstrap'; // раличные плагины и пакеты для vuejs
import './vueSimpleComponents'; // файл для импорта простых компонентов vue
import App from './App.vue'; // компонент - точка входа
import router from './router'; // роутер
import store from './store/store'; // хранилище vuex
import './registerServiceWorker'; // ???
import './globals'; // глобальные настройки
import i18n from './i18n'; // языковой файл
import { addAuthorizationHeaderFromLocalStorage } from '@/domain/util/libraries/AxiosConfig';
Vue.config.productionTip = false;
export const vueInstance = new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
    created() {
        if (localStorage.getItem('vuex')) {
            addAuthorizationHeaderFromLocalStorage(localStorage.getItem('vuex'));
        }
    },
}).$mount('#app');
//# sourceMappingURL=main.js.map