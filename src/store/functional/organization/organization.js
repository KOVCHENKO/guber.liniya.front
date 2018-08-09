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
    createOrganization({ state, dispatch }) {
        axios.post(baseUrl + 'organizations/create', state.organization).then(() => {
            dispatch('getAllOrganizations'); // Обновить список организаций после создания
        }, () => {
            ErrorNotifier.notify();
        });
    },
    updateOrganization({ state, dispatch }) {
        return new Promise((resolve, reject) => {
            axios.post(baseUrl + 'organizations/update/' + state.organization.id, state.organization).then(() => {
                dispatch('getAllOrganizations'); // Обновить список организаций после создания
                resolve();
            }, () => {
                reject(ErrorNotifier.notify());
            });
        });
    },
    getOrganization(context, payload) {
        return new Promise((resolve, reject) => {
            axios.get(baseUrl + 'organizations/get_by_id/' + payload.id).then((response) => {
                state.organization = response.data;
                resolve(response);
            }, () => {
                reject(ErrorNotifier.notify());
            });
        });
    },
};
export const organization = {
    state, actions,
};
//# sourceMappingURL=organization.js.map