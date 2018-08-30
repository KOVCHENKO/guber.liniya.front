import IProblem from '@/domain/entities/functional/interfaces/IProblem';

export default interface RootState {
    applicationName: string;
    user: any;
    search: string;

    problemType?: any;
    problem?: IProblem;
    cabinet?: any;
    pagination?: any;
}
