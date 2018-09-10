import Call from '@/domain/entities/functional/Call';
import axios from 'axios';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import { baseUrl } from '@/globals';
export const state = {
    call: new Call(0, '', '', '', 'success', 'in', '', '', ''),
    calls: [],
};
export const actions = {
    async getCalls({ rootState, dispatch }) {
        try {
            const res = await axios.get(`${baseUrl}calls/all/${rootState.pagination.currentPage}`);
            state.calls = res.data.calls;
            dispatch('formPagination', { lastPage: res.data.pages });
        }
        catch {
            ErrorNotifier.notify();
        }
    },
    async markCallAsFaulty({ dispatch }) {
        try {
            await axios.get(`${baseUrl}calls/mark_call_as_faulty/${state.call.id}`);
            dispatch('getCalls');
        }
        catch {
            ErrorNotifier.notify();
        }
    },
};
export const call = {
    state, actions,
};
//# sourceMappingURL=call.js.map