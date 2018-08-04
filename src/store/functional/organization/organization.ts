import {ActionTree, Module, MutationTree} from 'vuex';
import RootState from '@/store/types';
import OrganizationState from '@/store/functional/organization/types';
import {baseUrl} from '@/globals';
import ErrorNotifier from '@/domain/util/ErrorNotifier';
import axios from 'axios';
import Organization from '@/domain/entities/functional/Organization';
import OrganizationCollection from '@/domain/collections/functional/OrganizationCollection';

export const state: OrganizationState = {
    organization: new Organization(0, '', '', 0),
    organizations: new OrganizationCollection(),
};

export const mutations: MutationTree<OrganizationState> = {
    getAllOrganizations(state, payload) {
        state.organizations = payload;
    },
};

export const actions: ActionTree<OrganizationState, RootState> = {
    getAllOrganizations({commit}) {
        axios.get(baseUrl + 'organizations/all').then((response) => {
            commit('getAllOrganizations', response.data);
        }, () => {
            ErrorNotifier.notify();
        });
    },
};

export const organization: Module<OrganizationState, RootState> = {
    state, mutations, actions,
};

