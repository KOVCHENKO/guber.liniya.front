import Router from '@/router';
import {ActionTree, Module, MutationTree} from 'vuex';
import axios from 'axios';
import { baseUrl } from '@/globals';
import UserState from '@/store/common/user/types';
import User from '@/domain/entities/common/User';
import RootState from '@/store/types';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import SuccessNotifier from '@/domain/util/notifications/SuccessNotifier';

export const state: UserState = {
    user: new User(0, '', ''),
    users: [{}],
    token: '',
};


export const actions: ActionTree<UserState, RootState> = {
    /**
     * Получение залогиненного пользователя с сервера
     * @param {any} commit
     * @param state
     * @returns {any}
     */
    getUser({commit, state, rootState}): any {
        axios.get(baseUrl + 'get_user').then((response) => {
                state.user = response.data;
                
                axios.get(baseUrl + 'get_cabinets/' + rootState.user.user.id).then((response) => {
                    rootState.cabinet.cabinets = response.data;
                    Router.push({ name: rootState.cabinet.cabinets[0].route });
                }, () => {
                    ErrorNotifier.notify();
                });

            }, () => {
                ErrorNotifier.notify();
            });
    },

    async getSpecialistsOfOrganization(context, payload) {
        try {
            const url = `${baseUrl}specialists/get_specialists_of_organization/${payload.organization_id}`;
            const result = await axios.get(url);
            state.users = result.data;
        } catch {
            ErrorNotifier.notify();
        }
    },

    async addSpecialist(context, payload) {
        try {
            const url = `${baseUrl}specialists/create_specialist/${payload.organization_id}`;
            const result = await axios.post(url, state.user);
            state.users.push(result.data);

            SuccessNotifier.notify('Специалист', 'Добавлен новый специалист');

        } catch {
            ErrorNotifier.notify();
        }
        // create specialist
    },
};

export const user: Module<UserState, RootState> = {
    state,
    actions,
};
