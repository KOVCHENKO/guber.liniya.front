import ProblemType from '@/domain/entities/functional/ProblemType';
import ProblemTypeCollection from '@/domain/collections/functional/ProblemTypeCollection';
import axios from 'axios';
import { baseUrl } from '@/globals';
import ErrorNotifier from '@/domain/util/ErrorNotifier';
export const state = {
    problemType: new ProblemType(0, '', ''),
    problemTypes: new ProblemTypeCollection(),
};
export const mutations = {
    getAllProblemTypes(state, payload) {
        state.problemTypes = payload;
        return payload;
    },
};
export const actions = {
    getAllProblemTypes({ commit }) {
        axios.get(baseUrl + 'problem_types/all').then((response) => {
            commit('getAllProblemTypes', response.data);
        }, () => {
            ErrorNotifier.notify();
        });
    },
};
export const problemType = {
    state, mutations, actions,
};
//# sourceMappingURL=problemType.js.map