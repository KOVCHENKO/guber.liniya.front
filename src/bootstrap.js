import Vue from 'vue';
import axios from 'axios';

/* Компонент для интернационализации */
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

/* Loading Jquery */
try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap-sass');
} catch (e) {}

/* Компонент для уведомлений (шаблон <notifications></notifications> находится в TopMenu.vue) */
import Notifications from 'vue-notification';
Vue.use(Notifications);
