import Call from '@/domain/entities/functional/Call';
import axios from 'axios';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
export const state = {
    call: new Call('', '', '', '', '', '', 0, 0, ''),
    calls: [],
    crmToken: '',
    crmAddress: 'https://dummy_address/',
};
export const actions = {
    async getCalls() {
        try {
            const res = await axios.post(`${state.crmAddress}`, {
                cmd: 'history',
                period: 'today',
                token: state.crmToken,
            });
            state.calls = res.data;
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