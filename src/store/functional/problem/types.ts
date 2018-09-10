import IProblem from '@/domain/entities/functional/interfaces/IProblem';
import IProblemCollection from '@/domain/collections/functional/interfaces/IProblemCollection';

export default interface IProblemState {
    problem: IProblem;
    problems: IProblemCollection;
    organizations: [{}];
}
