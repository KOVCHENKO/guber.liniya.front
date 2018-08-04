import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { cabinet } from './common/cabinet/cabinet';
import { user } from '@/store/common/user/user';
import { organization } from '@/store/functional/organization/organization';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        applicationName: 'psychology platform!',
        user: [],
    },
    mutations: {},
    actions: {},
    modules: {
        cabinet,
        user,
        organization,
    },
    plugins: [createPersistedState()],
});
//# sourceMappingURL=store.js.map