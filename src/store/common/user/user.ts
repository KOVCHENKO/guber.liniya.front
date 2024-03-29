import Router from '@/router';
import {ActionTree, Module, MutationTree} from 'vuex';
import axios from 'axios';
import { baseUrl } from '@/globals';
import UserState from '@/store/common/user/types';
import User from '@/domain/entities/common/User';
import Organizaion from '@/domain/entities/functional/Organization';
import RootState from '@/store/types';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import SuccessNotifier from '@/domain/util/notifications/SuccessNotifier';
import CabinetCollection from '@/domain/collections/common/CabinetCollection';
import Role from '@/domain/entities/common/Role';


export const state: UserState = {
    user: new User(0, '', '', new Organizaion(0, '', '',  0)),
    users: [{}],
    token: '',
    role: new Role(0, '', ''),
    nickname: '',
};

export const mutations: MutationTree<UserState> = {
    /**
     * Получение пользователя - и после этого редирект на рабочий стол
     * @param state
     * @param {CabinetCollection} payload
     */
    getUser(state, payload) {
        state.user = payload;
        state.role = payload.role;
        state.nickname = payload.nickname;
        Router.push({ name: 'desktop' });
    },
};

export const actions: ActionTree<UserState, RootState> = {
    /**
     * Получение залогиненного пользователя с сервера
     * @param {any} commit
     * @param state
     * @param dispatch
     * @returns {any}
     */
    getUser({commit, state, dispatch}): any {
        axios.get(baseUrl + 'get_user').then((response) => {
                const payload = response.data;
                commit('getUser', payload);
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
    },

    async getNewToken(context, payload) {
        try {
            const url = `${baseUrl}refresh`;
            const result = await axios.post(url, state.user);
            state.token =  'Bearer ' + result.data.token;
        } catch {
            ErrorNotifier.notify();
        }
    },
};

export const user: Module<UserState, RootState> = {
    state,
    mutations,
    actions,
};
