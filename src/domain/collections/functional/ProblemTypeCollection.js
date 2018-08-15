import { getSelectedNodes } from '@/domain/util/interface/TreeMaker';
export class ProblemTypeCollection {
    constructor(problemTypes) {
        this.problemTypes = problemTypes;
    }
    addNew(problemType) {
        this.problemTypes.push(problemType);
    }
    addBunchOfProblemTypes(problemTypes) {
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
}
//# sourceMappingURL=ProblemTypeCollection.js.map