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
import { pagination } from '@/store/util/pagination/pagination';
import { comment } from '@/store/functional/comment/comment';
import { applicant } from '@/store/functional/applicant/applicant';
import { interstate } from '@/store/util/interface/interface';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        applicationName: 'psychology platform!',
        user: [],
        search: '',
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
        pagination,
        comment,
        applicant,
        interstate,
    },
    plugins: [createPersistedState({
            paths: ['cabinet', 'user'],
        })],
});
//# sourceMappingURL=store.js.map