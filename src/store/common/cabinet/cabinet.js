import Router from '@/router';
import axios from 'axios';
import { baseUrl } from '@/globals';
import CabinetCollection from '@/domain/collections/common/CabinetCollection';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
export const state = {
    cabinets: new CabinetCollection([{ id: 0, route: '', name: '', icon: '' }]),
};
export const actions = {
    /**
     * Получение кабиентов с сервера
     * @param {any} commit
     * @param rootState
     * @returns {any}
     */
    getCabinets({ commit, rootState }) {
        axios.get(baseUrl + 'get_cabinets/' + rootState.user.user.id).then((response) => {
            state.cabinets = response.data;
            Router.push({ name: response.data[0].route });
        }, () => {
            ErrorNotifier.notify();
        });
    },
};
export const cabinet = {
    state,
    actions,
};
//# sourceMappingURL=cabinet.js.map