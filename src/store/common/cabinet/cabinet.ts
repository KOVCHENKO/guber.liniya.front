import Router from '@/router';
import {ActionTree, Module, MutationTree} from 'vuex';
import RootState from '@/store/types';
import CabinetState from '@/store/common/cabinet/types';
import axios from 'axios';
import {baseUrl} from '@/globals';
import CabinetCollection from '@/domain/collections/common/CabinetCollection';
import ErrorNotifier from '@/domain/util/ErrorNotifier';

export const state: CabinetState = {
    cabinets: new CabinetCollection(),
};

export const mutations: MutationTree<CabinetState> = {
    /**
     * Получение кабинетов с сервера
     * @param state
     * @param {CabinetCollection} payload
     */
    getCabinets(state, payload: CabinetCollection) {
        state.cabinets = payload;
        Router.push(payload[0].modules[0].dir);
    },
};


export const actions: ActionTree<CabinetState, RootState> = {
    /**
     * Получение кабиентов с сервера
     * @param {any} commit
     * @param rootState
     * @returns {any}
     */
    getCabinets({ commit, rootState }): any {
        axios.get(baseUrl + 'get_cabinets/' + rootState.user.user.id)
            .then((response) => {
            const payload: CabinetCollection = response.data;
            commit('getCabinets', payload);
        }, () => {
            ErrorNotifier.notify();
        });
    },
};

export const cabinet: Module<CabinetState, RootState> = {
    state,
    actions,
    mutations,
};

