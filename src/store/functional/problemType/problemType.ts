import ProblemTypeState from '@/store/functional/problemType/types';
import ProblemType from '@/domain/entities/functional/ProblemType';
import ProblemTypeCollection from '@/domain/collections/functional/ProblemTypeCollection';
import {ActionTree, Module, MutationTree} from 'vuex';
import RootState from '@/store/types';
import axios from 'axios';
import {baseUrl} from '@/globals';
import ErrorNotifier from '@/domain/util/ErrorNotifier';
import IProblemTypeCollection from '@/domain/collections/functional/interfaces/IProblemTypeCollection';

export const state: ProblemTypeState = {
    problemType: new ProblemType(0, '', ''),
    problemTypes: new ProblemTypeCollection(),
};

export const mutations: MutationTree<ProblemTypeState> = {
    getAllProblemTypes(state, payload): IProblemTypeCollection {
      state.problemTypes = payload;
      return payload;
    },
};

export const actions: ActionTree<ProblemTypeState, RootState> = {
    getAllProblemTypes({commit}) {
        axios.get(baseUrl + 'problem_types/all').then((response) => {
            commit('getAllProblemTypes', response.data);
        }, () => {
            ErrorNotifier.notify();
        });
    },
};

export const problemType: Module<ProblemTypeState, RootState> = {
    state, mutations, actions,
};
