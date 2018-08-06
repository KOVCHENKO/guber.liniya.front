import IProblem from '@/domain/entities/functional/interfaces/IProblem';

interface IProblemCollection {
    problems: IProblem[];
    add(problem);
}

export default IProblemCollection;
