import axios from 'axios';
import {baseUrl} from '@/globals';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
import IProblemState from '@/store/functional/problem/types';
import {ActionTree, Module} from 'vuex';
import RootState from '@/store/types';
import Problem from '@/domain/entities/functional/Problem';
import ProblemCollection from '@/domain/collections/functional/ProblemCollection';


export const state: IProblemState = {
    problem: new Problem(0, '', ''),
    problems: new ProblemCollection([]),
};

export const actions: ActionTree<IProblemState, RootState> = {
    createProblem({commit, state, rootState}) {
        state.problem.problem_type_id = rootState.problemType.problemType.id;

        axios.post(baseUrl + 'problems/create', state.problem).then((response) => {
            rootState.problemType.problemType.problems.push(response.data);
            state.problem = new Problem(0, '', '');
        }, () => {
            ErrorNotifier.notify();
        });
    },
};

export const problem: Module<IProblemState, RootState> = {
    state, actions,
};
