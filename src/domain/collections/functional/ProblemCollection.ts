import IProblemCollection from '@/domain/collections/functional/interfaces/IProblemCollection';
import Problem from '@/domain/entities/functional/Problem';
import ProblemType from '@/domain/entities/functional/ProblemType';

class ProblemCollection implements IProblemCollection {
    public problems: Problem[];

    constructor(problems) {
        this.problems = problems;
    }

    public add(problem): void {
        this.problems.push(problem);
    }

    public addNewProblem(problemType: ProblemType[], newProblem: any) {
        newProblem.opened = false;
        newProblem.disabled = true;
        newProblem.text = newProblem.name;
        newProblem.icon = 'fas fa-exclamation';
        newProblem.type = 'problem';

        problemType.push(newProblem);
        return problemType;

    }
}

export default ProblemCollection;
