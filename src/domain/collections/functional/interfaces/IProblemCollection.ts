import IProblem from '@/domain/entities/functional/interfaces/IProblem';

interface IProblemCollection {
    problems: IProblem[];
    add(problem: IProblem): void;
}

export default IProblemCollection;
