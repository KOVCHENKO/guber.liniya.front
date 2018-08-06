import { baseUrl } from '@/globals';
import ErrorNotifier from '@/domain/util/ErrorNotifier';
import axios from 'axios';
import Organization from '@/domain/entities/functional/Organization';
export const state = {
    organization: new Organization(0, '', '', 0),
    organizations: [{}],
};
export const actions = {
    getAllOrganizations({ commit }) {
        axios.get(baseUrl + 'organizations/all').then((response) => {
            state.organizations = response.data;
        }, () => {
            ErrorNotifier.notify();
        });
    },
};
export const organization = {
    state, actions,
};
//# sourceMappingURL=organization.js.map