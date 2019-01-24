import axios from 'axios';
import RoleState from '@/store/functional/role/types';
import {ActionTree} from 'vuex';
import RootState from '@/store/types';
import {baseUrl} from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';

export const state: RoleState = {
    role: {
        id: 0,
        name: '',
        description: '',
    },

    roles: [],
};

export const actions: ActionTree<RoleState, RootState> = {
    async getRoles() {
        try {
            const res = await axios.get(`${baseUrl}roles/all`);
            state.roles = res.data.roles;
        } catch {
            ErrorNotifier.notify();
        }
    },
};
