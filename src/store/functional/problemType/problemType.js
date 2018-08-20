import ProblemType from '@/domain/entities/functional/ProblemType';
import { ProblemTypeCollection } from '@/domain/collections/functional/ProblemTypeCollection';
import axios from 'axios';
import { baseUrl } from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import SuccessNotifier from '@/domain/util/notifications/SuccessNotifier';
export const state = {
    problemType: new ProblemType(0, '', ''),
    problemTypes: new ProblemTypeCollection([]),
    problemTypesTree: [{}],
};
export const actions = {
    getAllProblemTypes({ state }) {
        return new Promise((resolve, reject) => {
            axios.get(baseUrl + 'problem_types/all').then((response) => {
                const problemTypes = new ProblemTypeCollection([]);
                state.problemTypes = problemTypes.addBunchOfProblemTypes(response.data);
                resolve(problemTypes.addBunchOfProblemTypes(response.data));
            }, () => {
                reject(ErrorNotifier.notify());
            });
        });
    },
    createProblemType({ commit, state, dispatch }) {
        axios.post(baseUrl + 'problem_types/create', state.problemType).then((response) => {
            SuccessNotifier.notify('Тип проблемы', 'Добавлен новый тип проблемы');
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
            state.problemTypesTree = problemTypes.makeProblemTypesTree(response.data.problems, response.data.checked_problems_ids);
        }, () => {
            ErrorNotifier.notify();
        });
    },
};
export const problemType = {
    state, actions,
};
//# sourceMappingURL=problemType.js.map