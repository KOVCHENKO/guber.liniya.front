import Router from '@/router';
import axios from 'axios';
import { baseUrl } from '@/globals';
import CabinetCollection from '@/domain/collections/common/CabinetCollection';
import ErrorNotifier from '@/domain/util/ErrorNotifier';
export const state = {
    cabinets: new CabinetCollection(),
};
export const mutations = {
    /**
     * Получение кабинетов с сервера
     * @param state
     * @param {CabinetCollection} payload
     */
    getCabinets(state, payload) {
        state.cabinets = payload;
        Router.push(payload[0].modules[0].dir);
    },
};
export const actions = {
    /**
     * Получение кабиентов с сервера
     * @param {any} commit
     * @param rootState
     * @returns {any}
     */
    getCabinets({ commit, rootState }) {
        axios.get(baseUrl + 'get_cabinets/' + rootState.user.user.id)
            .then((response) => {
            const payload = response.data;
            commit('getCabinets', payload);
        }, () => {
            ErrorNotifier.notify();
        });
    },
};
export const cabinet = {
    state,
    actions,
    mutations,
};
//# sourceMappingURL=cabinet.js.map