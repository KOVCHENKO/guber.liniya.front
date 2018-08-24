import { baseUrl } from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import SuccessNotifier from '@/domain/util/notifications/SuccessNotifier';
import axios from 'axios';
import Organization from '@/domain/entities/functional/Organization';
import { makeTree } from '@/domain/util/interface/TreeMaker';
export const state = {
    organization: new Organization(0, '', '', 0),
    organizations: [{}],
    organizationTree: [{}],
    claims: [{}],
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
    deleteOrganization({ state, dispatch }) {
        axios.get(baseUrl + 'organizations/delete/' + state.organization.id).then(() => {
            dispatch('getAllOrganizations'); // Обновить список организаций после создания
        }, () => {
            ErrorNotifier.notify();
        });
    },
    /**
     * @param context
     * @param payload - problem_type_id - ProblemTypeId, organization_id - OrganizationId
     * @returns {Promise<any>}
     */
    bindProblemTypeToOrganization(context, payload) {
        const problemId = payload.problem_id;
        const status = payload.status;
        const organizationId = payload.organization_id;
        axios.get(baseUrl + 'organizations/bind_problem_type_to_organization/'
            + organizationId + '/' + problemId + '/' + status)
            .then(() => {
            SuccessNotifier.notify('Инфо', 'Статус привязки проблемы к организации изменен');
        }).catch(() => {
            ErrorNotifier.notify();
        });
    },
    async getAllClaimsOfOrganization(context, payload) {
        try {
            const organizationId = payload.organization_id;
            const result = await axios.get(baseUrl + 'organizations/all_claims_of_organization/'
                + organizationId);
            state.claims = result.data;
        }
        catch {
            ErrorNotifier.notify();
        }
    },
};
export const organization = {
    state, actions,
};
//# sourceMappingURL=organization.js.map