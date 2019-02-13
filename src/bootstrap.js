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
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
}
catch (e) { }
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
window.io = require('socket.io-client');
// import EchoLibrary from 'laravel-echo';
// export const Echo = new EchoLibrary({
//     broadcaster: 'socket.io',
//     host: 'localhost' + ':6001',
// });
import VueSocketIO from 'vue-socket.io';
import store from './store/store'; // хранилище vuex
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'localhost:6001',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_',
    },
}));
//# sourceMappingURL=bootstrap.js.map