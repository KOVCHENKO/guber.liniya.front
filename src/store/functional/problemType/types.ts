import IProblemTypeCollection from '@/domain/collections/functional/interfaces/IProblemTypeCollection';
import ProblemType from '@/domain/entities/functional/interfaces/ProblemType';

export default interface ProblemTypeState {
    problemTypes: IProblemTypeCollection;
    problemType: ProblemType;
}
