import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import RootState from '@/store/types';
import {cabinet} from './common/cabinet/cabinet';
import {user} from '@/store/common/user/user';
import {organization} from '@/store/functional/organization/organization';
import {problemType} from '@/store/functional/problemType/problemType';
import {problem} from '@/store/functional/problem/problem';


Vue.use(Vuex);

export default new Vuex.Store<RootState>({
    state: {
        applicationName: 'psychology platform!',
        user: [],
    },

    mutations: {

    },

    actions: {

    },

    modules: {
        cabinet,
        user,
        organization,
        problemType,
        problem,
    },

    // plugins: [createPersistedState()],
});
