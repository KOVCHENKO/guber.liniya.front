import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { cabinet } from './common/cabinet/cabinet';
import RootState from '@/store/types';
import {user} from '@/store/common/user/user';


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
    },

    plugins: [createPersistedState()],
});
