import axios from 'axios';
import { baseUrl } from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
export const state = {
    role: {
        id: 0,
        name: '',
        description: '',
    },
    roles: [],
};
export const actions = {
    async getRoles() {
        try {
            const res = await axios.get(`${baseUrl}roles/all`);
            state.roles = res.data.roles;
        }
        catch {
            ErrorNotifier.notify();
        }
    },
};
//# sourceMappingURL=role.js.map