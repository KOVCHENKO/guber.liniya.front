import ProblemType from '@/domain/entities/functional/ProblemType';
import ProblemTypeCollection from '@/domain/collections/functional/ProblemTypeCollection';
import axios from 'axios';
import { baseUrl } from '@/globals';
import ErrorNotifier from '@/domain/util/ErrorNotifier';
export const state = {
    problemType: new ProblemType(0, '', ''),
    problemTypes: new ProblemTypeCollection([]),
};
export const actions = {
    getAllProblemTypes({ commit, state }) {
        axios.get(baseUrl + 'problem_types/all').then((response) => {
            state.problemTypes.addBunchOfProblemTypes(response.data);
        }, () => {
            ErrorNotifier.notify();
        });
    },
    createProblemType({ commit, state }) {
        axios.post(baseUrl + 'problem_types/create', state.problemType).then((response) => {
            state.problemTypes.addNew(response.data);
        }, () => {
            ErrorNotifier.notify();
        });
    },
    getSingleProblemType(context, payload) {
        axios.get(baseUrl + 'problem_types/get_by_id/' + payload.id).then((response) => {
            state.problemType = response.data;
        }, () => {
            ErrorNotifier.notify();
        });
    },
};
export const problemType = {
    state, actions,
};
//# sourceMappingURL=problemType.js.map