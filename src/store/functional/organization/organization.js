import { baseUrl } from '@/globals';
import ErrorNotifier from '@/domain/util/ErrorNotifier';
import axios from 'axios';
import Organization from '@/domain/entities/functional/Organization';
import { makeTree } from '@/domain/util/interface/TreeMaker';
export const state = {
    organization: new Organization(0, '', '', 0),
    organizations: [{}],
    organizationTree: [{}],
};
export const actions = {
    getAllOrganizations({ commit }) {
        axios.get(baseUrl + 'organizations/all').then((response) => {
            state.organizationTree = makeTree(response.data);
        }, () => {
            ErrorNotifier.notify();
        });
    },
    createOrganization() {
        axios.post(baseUrl + 'organizations/create', state.organization).then((response) => {
            // state.organizationTree = makeTree(response.data);
        }, () => {
            ErrorNotifier.notify();
        });
    },
};
export const organization = {
    state, actions,
};
//# sourceMappingURL=organization.js.map