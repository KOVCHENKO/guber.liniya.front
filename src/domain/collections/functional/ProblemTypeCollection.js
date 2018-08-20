import { getSelectedNodes } from '@/domain/util/interface/TreeMaker';
export class ProblemTypeCollection {
    constructor(problemTypes) {
        this.problemTypes = problemTypes;
    }
    addNew(problemType) {
        this.problemTypes.push(problemType);
    }
    addBunchOfProblemTypes(problemTypes) {
        for (const problemType of problemTypes) {
            problemType.text = problemType.name;
            problemType.data = {};
            problemType.data.icon = '/images/test_problem/008-light-bulb.png';
            for (const problem of problemType.children) {
                problem.text = problem.name;
                problem.data = {};
                problem.data.icon = '/images/test_problem/008-light-bulb.png';
            }
        }
        return problemTypes;
    }
    /**
     * @param problemTypes - типы проблемы
     * @param checkedProblems - массив ид - проблемы, которые уже отмечены для организаций
     * @returns {any}
     */
    makeProblemTypesTree(problemTypes, checkedProblems) {
        for (const problemType of problemTypes) {
            problemType.text = problemType.name;
            problemType.opened = true;
            problemType.disabled = true;
            for (const problem of problemType.children) {
                problem.text = problem.name;
                problem.opened = true;
                problem.selected = false;
            }
        }
        return getSelectedNodes(problemTypes, checkedProblems);
    }
    /**
     * Получить индекс problemTYpe
     * @param problemTypeId
     * @returns {number}
     */
    getProblemTypeIndex(problemTypeId) {
        return this.problemTypes.map((e) => {
            return e.id;
        }).indexOf(parseInt(problemTypeId, 10));
    }
}
//# sourceMappingURL=ProblemTypeCollection.js.map