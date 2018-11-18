import Call from '@/domain/entities/functional/Call';
import axios from 'axios';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import { baseUrl } from '@/globals';
export const state = {
    call: new Call(0, '', '', '', 'success', 'in', '', '', ''),
    calls: [],
    filter: {
        dateFilter: 'all',
        from: '2018-01-01',
        to: '2019-01-01',
    },
};
export const actions = {
    async getCalls({ rootState, dispatch }) {
        try {
            const res = await axios.post(`${baseUrl}calls/all/${rootState.pagination.currentPage}`, {
                dateFilter: state.filter.dateFilter,
                from: state.filter.from,
                to: state.filter.to,
            });
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