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

export const state: ClaimState = {
    claim: new Claim(0, '', '', '', '', '', '', '',
                        new Address(0, 'Астрахань', ''),
                        new Problem(0, 'Выберите проблему', '')),
    claims: [{}],
};

export const actions: ActionTree<ClaimState, RootState> = {
    async getAllClaims() {
        try {
            const result = await axios.get(baseUrl + 'claims/all');
            state.claims = result.data;
        } catch {
            ErrorNotifier.notify();
        }
    },

    async createClaim() {
        try {
            const result = await axios.post(`${baseUrl}claims/create`, state.claim);
            state.claims.push(result.data);

            SuccessNotifier.notify('Заявка', 'Создана новая заявка');

            state.claim = new Claim(0, '', '', '', '', '', '', '',
                new Address(0, 'Астрахань', ''),
                new Problem(0, 'Выберите проблему', ''));
        } catch {
            ErrorNotifier.notify();
        }
    },

};

export const claim: Module<ClaimState, RootState> = {
    state, actions,
};
