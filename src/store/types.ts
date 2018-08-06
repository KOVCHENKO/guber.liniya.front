import IProblem from '@/domain/entities/functional/interfaces/IProblem';

export default interface RootState {
    applicationName: string;
    user: any;
    problemType?: any;
    problem?: IProblem;
}
