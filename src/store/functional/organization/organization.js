import { baseUrl } from '@/globals';
import ErrorNotifier from '@/domain/util/ErrorNotifier';
import axios from 'axios';
import Organization from '@/domain/entities/functional/Organization';
import OrganizationCollection from '@/domain/collections/functional/OrganizationCollection';
export const state = {
    organization: new Organization(0, '', '', 0),
    organizations: new OrganizationCollection(),
};
export const mutations = {
    getAllOrganizations(state, payload) {
        state.organizations = payload;
    },
};
export const actions = {
    getAllOrganizations({ commit }) {
        axios.get(baseUrl + 'organizations/all').then((response) => {
            commit('getAllOrganizations', response.data);
        }, () => {
            ErrorNotifier.notify();
        });
    },
};
export const organization = {
    state, mutations, actions,
};
//# sourceMappingURL=organization.js.map