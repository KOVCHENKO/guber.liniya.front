import Router from '@/router';
import axios from 'axios';
import { baseUrl } from '@/globals';
import User from '@/domain/entities/common/User';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
export const state = {
    user: new User(0, '', ''),
    users: [{}],
    token: '',
};
export const mutations = {
    getUser(state, payload) {
        state.user = payload;
        Router.push({ name: 'menu' });
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
        axios.get(baseUrl + 'get_user').then((response) => {
            commit('getUser', response.data);
        }, () => {
            ErrorNotifier.notify();
        });
    },
    async getSpecialistsOfOrganization(context, payload) {
        try {
            const result = await axios.get(`${baseUrl}users/get_specialists/${payload.organization_id}`);
            state.users = result.data;
        }
        catch {
            ErrorNotifier.notify();
        }
    },
};
export const user = {
    state,
    mutations,
    actions,
};
//# sourceMappingURL=user.js.map