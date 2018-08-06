import IProblemCollection from '@/domain/collections/functional/interfaces/IProblemCollection';
import Problem from '@/domain/entities/functional/Problem';

class ProblemCollection implements IProblemCollection {
    public problems: Problem[];

    constructor(problems) {
        this.problems = problems;
    }

    public add(problem): void {
        this.problems.push(problem);
    }
}

export default ProblemCollection;
