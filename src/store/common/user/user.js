import Router from '@/router';
import axios from 'axios';
import { baseUrl } from '@/globals';
import User from '@/domain/entities/common/User';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import SuccessNotifier from '@/domain/util/notifications/SuccessNotifier';
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
            const url = `${baseUrl}specialists/get_specialists_of_organization/${payload.organization_id}`;
            const result = await axios.get(url);
            state.users = result.data;
        }
        catch {
            ErrorNotifier.notify();
        }
    },
    async addSpecialist(context, payload) {
        try {
            const url = `${baseUrl}specialists/create_specialist/${payload.organization_id}`;
            const result = await axios.post(url, state.user);
            state.users.push(result.data);
            SuccessNotifier.notify('Специалист', 'Добавлен новый специалист');
        }
        catch {
            ErrorNotifier.notify();
        }
        // create specialist
    },
};
export const user = {
    state,
    mutations,
    actions,
};
//# sourceMappingURL=user.js.map