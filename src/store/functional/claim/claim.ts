import ClaimState from '@/store/functional/claim/types';
import {ActionTree, Module} from 'vuex';
import RootState from '@/store/types';
import axios from 'axios';
import {baseUrl} from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import Claim from '@/domain/entities/functional/Claim';
import Problem from '@/domain/entities/functional/Problem';
import Address from '@/domain/entities/functional/Address';
import SuccessNotifier from '@/domain/util/notifications/SuccessNotifier';
import Call from '@/domain/entities/functional/Call';

export const state: ClaimState = {
    claim: new Claim(0, '', '', '', '', '', '', '', '', '', null,
                        new Address(0, 'Астрахань', ''),
                        new Problem(0, 'Выберите проблему', ''),
                        new Call(0, '', '', '', 'success', 'in',  '', '', '')),
    claims: [{}],
    previousClaims: [],
};

export const actions: ActionTree<ClaimState, RootState> = {
    async getAllClaims({rootState, dispatch}, payload) {
        try {
            const result = await axios.get(`${baseUrl}claims/all/
                                                    ${rootState.pagination.currentPage}/${payload.dispatchStatus}`);
            state.claims = result.data.claims;
            dispatch('formPagination', { lastPage: result.data.pages });
        } catch {
            ErrorNotifier.notify();
        }
    },

    async createClaim() {
        try {
            await axios.post(`${baseUrl}claims/create`, state.claim);
            SuccessNotifier.notify('Заявка', 'Создана новая заявка');
        } catch {
            ErrorNotifier.notify();
        }
    },

    async searchClaim({rootState, dispatch}, payload) {
        try {
            const result = await axios.get(`${baseUrl}claims/search/${rootState.pagination.currentPage}/
                                                                        ${payload.search}/${payload.dispatchStatus}`);
            state.claims = result.data.claims;
            dispatch('formPagination', { lastPage: result.data.pages });
        } catch {
            ErrorNotifier.notify();
        }
    },

    async getClaimsOfTheSamePhone() {
        try {
            const res = await axios.post(`${baseUrl}claims/get_previous_by_phone`, {
                phone: state.claim.phone,
            });
            state.previousClaims = res.data;
        } catch {
            ErrorNotifier.notify();
        }
    },

};

export const claim: Module<ClaimState, RootState> = {
    state, actions,
};
