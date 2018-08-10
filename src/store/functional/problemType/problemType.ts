import ProblemTypeState from '@/store/functional/problemType/types';
import ProblemType from '@/domain/entities/functional/ProblemType';
import { ProblemTypeCollection } from '@/domain/collections/functional/ProblemTypeCollection';
import {ActionTree, Module} from 'vuex';
import RootState from '@/store/types';
import axios from 'axios';
import {baseUrl} from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';

export const state: ProblemTypeState = {
    problemType: new ProblemType(0, '', ''),
    problemTypes: new ProblemTypeCollection([]),
    problemTypesTree: [{}],     // vuejs-tree плагин работает только с массивами
};

export const actions: ActionTree<ProblemTypeState, RootState> = {
    getAllProblemTypes({commit, state}) {
        axios.get(baseUrl + 'problem_types/all').then((response) => {
            state.problemTypes.addBunchOfProblemTypes(response.data);
        }, () => {
            ErrorNotifier.notify();
        });
    },

    createProblemType({commit, state}) {
        axios.post(baseUrl + 'problem_types/create', state.problemType).then((response) => {
            state.problemTypes.addNew(response.data);
        }, () => {
            ErrorNotifier.notify();
        });
    },

    /**
     * @param context
     * @param payload - id - ProblemTypeId
     * @returns {Promise<any>}
     */
    getSingleProblemType(context, payload) {
        return new Promise((resolve, reject) => {
            axios.get(baseUrl + 'problem_types/get_by_id/' + payload.id).then((response) => {
                state.problemType = response.data;
                resolve(response);
            }, () => {
                reject(ErrorNotifier.notify());
            });
        });
    },

    /**
     * @param context
     * @param payload - id - OrganizationId
     */
    getAllProblemTypesWithProblems(context, payload) {
        axios.get(baseUrl + 'problem_types/all_with_problems/' + payload.id).then((response) => {
            const problemTypes = new ProblemTypeCollection([]);
            state.problemTypesTree = problemTypes.makeProblemTypesTree(
                response.data.problems, response.data.checked_problems_ids,
            );
        }, () => {
            ErrorNotifier.notify();
        });
    },

};

export const problemType: Module<ProblemTypeState, RootState> = {
    state, actions,
};
