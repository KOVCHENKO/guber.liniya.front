import Call from '@/domain/entities/functional/Call';
import axios from 'axios';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import { baseUrl } from '@/globals';
export const state = {
    call: new Call(0, '', '', '', 'success', 'in', '', '', ''),
    calls: [],
    previousCalls: [],
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
    async getCallsOfTheSamePhone() {
        try {
            const res = await axios.post(`${baseUrl}calls/get_previous_by_phone`, state.call);
            state.previousCalls = res.data;
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