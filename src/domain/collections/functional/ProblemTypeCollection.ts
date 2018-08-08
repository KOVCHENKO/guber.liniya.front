import ProblemType from '@/domain/entities/functional/ProblemType';
import IProblemTypeCollection from '@/domain/collections/functional/interfaces/IProblemTypeCollection';
import {makeTree} from '@/domain/util/interface/TreeMaker';

class ProblemTypeCollection implements IProblemTypeCollection {
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

    public makeProblemTypesTree(problemTypes: any) {
        for (const problemType of problemTypes) {
            problemType.text = problemType.name;
            problemType.opened = true;

            for (const problem of problemType.children) {
                problem.text = problem.name;
                problem.opened = true;
            }
        }

        return problemTypes;
    }
}

export default ProblemTypeCollection;
