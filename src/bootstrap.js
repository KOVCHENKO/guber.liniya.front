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
    fieldsBagName: 'formFields'
});

/* Loading Jquery */
try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
} catch (e) {}


/* Компонент для уведомлений (шаблон <notifications></notifications> находится в TopMenu.vue) */
import Notifications from 'vue-notification';
Vue.use(Notifications);

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
Vue.use(VueMaterial);

import VueRx from 'vue-rx';
Vue.use(VueRx);
