import IProblem from '@/domain/entities/functional/interfaces/IProblem';

interface IProblemType {
    id: number;
    name: string;
    description: string;
    problems?: IProblem[];
    text?: string;

    // Интерфейсные элементы дерева
    opened?: boolean;
    disabled?: boolean;
    icon?: string;
    type?: string;
    children?: IProblemType[];
    selected?: boolean;
    push(newProblemType: IProblemType): any;
}

export default IProblemType;
