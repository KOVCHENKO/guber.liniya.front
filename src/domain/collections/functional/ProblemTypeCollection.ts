import ProblemType from '@/domain/entities/functional/ProblemType';
import IProblemTypeCollection from '@/domain/collections/functional/interfaces/IProblemTypeCollection';

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
}

export default ProblemTypeCollection;
