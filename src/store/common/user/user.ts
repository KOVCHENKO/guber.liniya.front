import Router from '@/router';
import {ActionTree, Module, MutationTree} from 'vuex';
import axios from 'axios';
import { baseUrl } from '@/globals';
import UserState from '@/store/common/user/types';
import User from '@/domain/entities/common/User';
import RootState from '@/store/types';
import ErrorNotifier from '@/domain/util/ErrorNotifier';

export const state: UserState = {
    user: new User(0, '', ''),
    token: '',
};

export const mutations: MutationTree<UserState> = {
    getUser(state, payload): any {
        state.user = payload;
        Router.push({ name: 'menu'});
    },
};

export const actions: ActionTree<UserState, RootState> = {
    /**
     * Получение залогиненного пользователя с сервера
     * @param {any} commit
     * @param state
     * @returns {any}
     */
    getUser({commit, state}): any {
        axios.get(baseUrl + 'get_user').then((response) => {
               commit('getUser', response.data);
            }, () => {
                ErrorNotifier.notify();
            });
    },
};

export const user: Module<UserState, RootState> = {
    state,
    mutations,
    actions,
};
