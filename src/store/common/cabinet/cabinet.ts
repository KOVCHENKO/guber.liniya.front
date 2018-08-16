import Router from '@/router';
import {ActionTree, Module, MutationTree} from 'vuex';
import RootState from '@/store/types';
import CabinetState from '@/store/common/cabinet/types';
import axios from 'axios';
import {baseUrl} from '@/globals';
import CabinetCollection from '@/domain/collections/common/CabinetCollection';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';


export const state: CabinetState = {
    cabinets: new CabinetCollection([{ id: 0, route: '', name: '', icon: '' }]),
};

export const actions: ActionTree<CabinetState, RootState> = {
    /**
     * Получение кабиентов с сервера
     * @param {any} commit
     * @param rootState
     * @returns {any}
     */
    getCabinets({ commit, rootState }): any {
        axios.get(baseUrl + 'get_cabinets/' + rootState.user.user.id).then((response) => {
            state.cabinets = response.data;
            Router.push({ name: response.data[0].route });
        }, () => {
            ErrorNotifier.notify();
        });
    },
};

export const cabinet: Module<CabinetState, RootState> = {
    state,
    actions,
};

