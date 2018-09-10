import axios from 'axios';
import { baseUrl } from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import Problem from '@/domain/entities/functional/Problem';
import ProblemCollection from '@/domain/collections/functional/ProblemCollection';
export const state = {
    problem: new Problem(0, '', ''),
    problems: new ProblemCollection([]),
    organizations: [{}],
};
const problemManip = new ProblemCollection([]);
export const actions = {
    async createProblem({ commit, state, rootState, dispatch }) {
        try {
            state.problem.problem_type_id = rootState.problemType.problemType.id;
            const res = await axios.post(baseUrl + 'problems/create', state.problem);
            state.problem = new Problem(0, '', '');
            dispatch('getAllProblemTypes');
        }
        catch {
            ErrorNotifier.notify();
        }
    },
    async deleteProblem({ dispatch }) {
        try {
            await axios.get(`${baseUrl}problems/delete/${state.problem.id}`);
            dispatch('getAllProblemTypes');
        }
        catch {
            ErrorNotifier.notify();
        }
    },
    getSingleProblem(context, payload) {
        return new Promise((resolve, reject) => {
            axios.get(baseUrl + 'problems/get_by_id/' + payload.id).then((response) => {
                state.problem = response.data;
                resolve(response);
            }, () => {
                reject(ErrorNotifier.notify());
            });
        });
    },
    async editProblem({ dispatch }) {
        try {
            await axios.post(`${baseUrl}problems/update/${state.problem.id}`, state.problem);
            dispatch('getAllProblemTypes');
        }
        catch {
            ErrorNotifier.notify();
        }
    },
    async getOrganizationsOfProblem(context, payload) {
        try {
            const res = await axios.get(`${baseUrl}problems/get_organizations_of_problem/${payload.problemId}`);
            state.organizations = res.data;
        }
        catch {
            ErrorNotifier.notify();
        }
    },
};
export const problem = {
    state, actions,
};
//# sourceMappingURL=problem.js.map