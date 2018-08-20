import axios from 'axios';
import { baseUrl } from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import Problem from '@/domain/entities/functional/Problem';
import ProblemCollection from '@/domain/collections/functional/ProblemCollection';
export const state = {
    problem: new Problem(0, '', ''),
    problems: new ProblemCollection([]),
};
export const actions = {
    createProblem({ commit, state, rootState }) {
        state.problem.problem_type_id = rootState.problemType.problemType.id;
        axios.post(baseUrl + 'problems/create', state.problem).then((response) => {
            state.problem = new Problem(0, '', '');
        }, () => {
            ErrorNotifier.notify();
        });
    },
};
export const problem = {
    state, actions,
};
//# sourceMappingURL=problem.js.map