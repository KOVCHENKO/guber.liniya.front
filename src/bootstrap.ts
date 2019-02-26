import Vue from 'vue';
import moment from 'moment';
moment.locale('ru');

/* Компонент для интернационализации */
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

import DatatableFactory from './components/util/VueJsDatatable/index';
Vue.use(DatatableFactory);

/* Vue validation */
import VeeValidate, { Validator } from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru';
Validator.localize('ru', ru);
Vue.use(VeeValidate, {
    fieldsBagName: 'formFields',
});

/* Loading Jquery */
try {
    // @ts-ignore
    // tslint:disable-next-line
    window.$ = window.jQuery = require('jquery');
    // tslint:disable-next-line
    require('bootstrap');
} finally {
    // TODO: warn concerning jquery and bootstrap connection
}


/* Компонент для уведомлений (шаблон <notifications></notifications> находится в TopMenu.vue) */
import Notifications from 'vue-notification';
Vue.use(Notifications);

import VueRx from 'vue-rx';
Vue.use(VueRx);

import VueGoodWizard from 'vue-good-wizard';
Vue.use(VueGoodWizard);

// Маска для полей
import VueMask from 'v-mask';
Vue.use(VueMask);

// @ts-ignore
// tslint:disable-next-line
const io = require('socket.io-client');
export const socket = io('http://localhost:3000');
