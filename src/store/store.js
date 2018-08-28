import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { cabinet } from './common/cabinet/cabinet';
import { user } from '@/store/common/user/user';
import { organization } from '@/store/functional/organization/organization';
import { problemType } from '@/store/functional/problemType/problemType';
import { problem } from '@/store/functional/problem/problem';
import { claim } from '@/store/functional/claim/claim';
import { call } from '@/store/functional/call/call';
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
        problemType,
        problem,
        claim,
        call,
    },
    plugins: [createPersistedState({
            paths: ['cabinet', 'user'],
        })],
});
//# sourceMappingURL=store.js.map