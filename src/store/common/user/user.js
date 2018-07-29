import Router from '@/router';
import axios from 'axios';
import { baseUrl } from '@/globals';
import User from '@/domain/entities/common/User';
import ErrorNotifier from '@/domain/util/ErrorNotifier';
export const state = {
    user: new User(0, '', ''),
    token: '',
};
export const mutations = {
    getUser(state, payload) {
        state.user = payload;
        Router.push({ name: 'desktop' });
    },
};
export const actions = {
    /**
     * Получение залогиненного пользователя с сервера
     * @param {any} commit
     * @param state
     * @returns {any}
     */
    getUser({ commit, state }) {
        axios.get(baseUrl + 'get_user', { headers: { Authorization: state.token } }).then((response) => {
            commit('getUser', response.data);
        }, () => {
            ErrorNotifier.notify();
        });
    },
};
export const user = {
    state,
    mutations,
    actions,
};
//# sourceMappingURL=user.js.map