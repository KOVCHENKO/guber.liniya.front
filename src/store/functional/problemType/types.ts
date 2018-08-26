import IProblemTypeCollection from '@/domain/collections/functional/interfaces/IProblemTypeCollection';
import IProblemType from '@/domain/entities/functional/interfaces/IProblemType';

export default interface ProblemTypeState {
    problemTypes: IProblemType[];
    problemType: IProblemType;
    problemTypesTree: [{}];
}
