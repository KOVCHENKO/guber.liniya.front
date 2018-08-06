import IProblem from '@/domain/entities/functional/interfaces/IProblem';

interface IProblemType {
    id: number;
    name: string;
    description: string;
    problems?: IProblem[];
}

export default IProblemType;
