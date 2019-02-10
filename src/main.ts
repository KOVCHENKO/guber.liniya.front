import Vue from 'vue';                  // собственно сам фреймворк
import './bootstrap';                   // раличные плагины и пакеты для vuejs
import App from './App.vue';            // компонент - точка входа
import router from './router';          // роутер
import store from './store/store';      // хранилище vuex
import './registerServiceWorker';       // ???
import './globals';                     // глобальные настройки
import i18n from './i18n';              // языковой файл
import * as bootstrap from 'bootstrap'; // typings - bootstrap
import $ from 'jquery';                 // typings - javascript
import {addAuthorizationHeaderFromLocalStorage} from '@/domain/util/libraries/AxiosConfig';

import axios from 'axios';
import {state} from '@/store/util/interface/interface';


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


        axios.interceptors.request.use((config) => {

            state.loading = true;

            // Do something before request is sent
            return config;
        }, (error) => {

            state.loading = false;
            // Do something with request error
            return Promise.reject(error);
        });

        // Add a response interceptor
        axios.interceptors.response.use((response) => {

            state.loading = false;

            // Do something with response data
            return response;
        }, (error) => {

            state.loading = false;
            // Do something with response error
            return Promise.reject(error);
        });

    },
}).$mount('#app');
