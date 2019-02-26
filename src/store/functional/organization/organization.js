import { baseUrl } from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import SuccessNotifier from '@/domain/util/notifications/SuccessNotifier';
import axios from 'axios';
import Organization from '@/domain/entities/functional/Organization';
import { makeTree } from '@/domain/util/interface/TreeMaker';
import ClaimService from '@/domain/services/functional/claims/ClaimService';
import AppService from '@/domain/services/common/AppService';
export const state = {
    organization: new Organization(0, '', '', null),
    organizations: [{}],
    organizationTree: [{}],
    claims: [{}],
    subcontractors: [{}],
};
export const actions = {
    /**
     * Получить организации и сформировать дерево
     * @param commit
     */
    getAllOrganizations({ commit }) {
        axios.get(baseUrl + 'organizations/all').then((response) => {
            state.organizationTree = makeTree(response.data, 'fas fa-building');
        }, () => {
            ErrorNotifier.notify();
        });
    },
    /**
     * Получить список организаций
     * @param commit
     */
    getAllPlainOrganizations({ commit }) {
        axios.get(baseUrl + 'organizations/all').then((response) => {
            state.organizations = response.data;
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
    async getAllClaimsOfOrganization({ rootState, dispatch }, payload) {
        try {
            const organizationId = payload.organization_id;
            const result = await axios.get(baseUrl + 'organizations/all_claims_of_organization/'
                + organizationId + '?dispatchStatusFilter=' + payload.dispatchStatusFilter +
                '&search=' + payload.search + '&page=' + rootState.pagination.currentPage +
                '&sortByData=' + payload.sortByData);
            state.claims = result.data.claims;
            state.claims = ClaimService.addTranslatedClaimStatus(state.claims);
            dispatch('formPagination', { lastPage: result.data.count });
        }
        catch {
            ErrorNotifier.notify();
        }
    },
    async getAllClaimsOfOrganization2({ rootState, dispatch }, payload) {
        try {
            const filter = ['status', 'initials', 'phone', 'address', 'minDate', 'maxDate', 'page', 'field', 'direction'];
            payload.page = rootState.pagination.currentPage;
            const paramUrl = AppService.assembleParamUrl(payload, filter);
            const url = 'organizations/all_claims_of_organization/' + payload.organization_id + paramUrl;
            const result = await axios.get(baseUrl + url);
            state.claims = result.data.claims;
            dispatch('formPagination', { lastPage: result.data.count });
        }
        catch {
            ErrorNotifier.notify();
        }
    },
    async getClaimsToChildrenOrganization({ rootState, dispatch }, payload) {
        try {
            const organizationId = payload.organization_id;
            const result = await axios.get(baseUrl + 'organizations/all_claims_of_children_organization/'
                + organizationId + '?dispatchStatusFilter=' + payload.dispatchStatusFilter +
                '&search=' + payload.search + '&page=' + rootState.pagination.currentPage +
                '&sortByData=' + payload.sortByData);
            state.claims = result.data.claims;
            state.claims = ClaimService.addTranslatedClaimStatus(state.claims);
            dispatch('formPagination', { lastPage: result.data.count });
        }
        catch {
            ErrorNotifier.notify();
        }
    },
    async getAllChildrenOrganization(context, payload) {
        try {
            const organizationId = payload.organization_id;
            const result = await axios.get(baseUrl + 'organizations/all_children_organization/'
                + organizationId);
            state.organizations = result.data;
        }
        catch {
            ErrorNotifier.notify();
        }
    },
    async getClaimsSubcontractors(context, payload) {
        try {
            const organizationId = payload.organization_id;
            const result = await axios.get(baseUrl + 'claims/get_claims_subcontractors/'
                + organizationId);
            state.subcontractors = result.data;
        }
        catch {
            ErrorNotifier.notify();
        }
    },
    async getSubcontractorUpdate(context, payload) {
        return new Promise((resolve, reject) => {
            axios.get(baseUrl + 'claims/update_subcontractor/' + payload.id).then(() => {
                SuccessNotifier.notify('Инфо', 'Заявка закрыта');
                resolve();
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