import IProblemCollection from '@/domain/collections/functional/interfaces/IProblemCollection';
import Problem from '@/domain/entities/functional/Problem';
import ProblemType from '@/domain/entities/functional/ProblemType';
import IProblem from '@/domain/entities/functional/interfaces/IProblem';

class ProblemCollection implements IProblemCollection {
    public problems: Problem[];

    constructor(problems: IProblem[]) {
        this.problems = problems;
    }

    public add(problem: IProblem): void {
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
