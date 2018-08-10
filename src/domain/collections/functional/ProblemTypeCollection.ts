import ProblemType from '@/domain/entities/functional/ProblemType';
import IProblemTypeCollection from '@/domain/collections/functional/interfaces/IProblemTypeCollection';
import {getSelectedNodes} from '@/domain/util/interface/TreeMaker';

export class ProblemTypeCollection implements IProblemTypeCollection {
    public problemTypes!: ProblemType[];

    constructor(problemTypes) {
        this.problemTypes = problemTypes;
    }

    public addNew(problemType): void {
        this.problemTypes.push(problemType);
    }

    public addBunchOfProblemTypes(problemTypes) {
        this.problemTypes = problemTypes;
    }

    /**
     * @param problemTypes - типы проблемы
     * @param checkedProblems - массив ид - проблемы, которые уже отмечены для организаций
     * @returns {any}
     */
    public makeProblemTypesTree(problemTypes: any, checkedProblems: any[]) {
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
