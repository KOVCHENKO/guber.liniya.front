import axios from 'axios';
import { baseUrl } from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import Claim from '@/domain/entities/functional/Claim';
import Problem from '@/domain/entities/functional/Problem';
import Address from '@/domain/entities/functional/Address';
import SuccessNotifier from '@/domain/util/notifications/SuccessNotifier';
export const state = {
    claim: new Claim(0, '', '', '', '', '', '', '', '', new Address(0, 'Астрахань', ''), new Problem(0, 'Выберите проблему', '')),
    claims: [{}],
};
export const actions = {
    async getAllClaims({ rootState, dispatch }) {
        try {
            const result = await axios.get(`${baseUrl}claims/all/${rootState.pagination.currentPage}`);
            state.claims = result.data.claims;
            dispatch('formPagination', { lastPage: result.data.pages });
        }
        catch {
            ErrorNotifier.notify();
        }
    },
    async createClaim() {
        try {
            await axios.post(`${baseUrl}claims/create`, state.claim);
            SuccessNotifier.notify('Заявка', 'Создана новая заявка');
        }
        catch {
            ErrorNotifier.notify();
        }
    },
};
export const claim = {
    state, actions,
};
//# sourceMappingURL=claim.js.map