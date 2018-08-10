import IProblemType from '@/domain/entities/functional/interfaces/IProblemType';

interface IProblemTypeCollection {
    problemTypes: IProblemType[];
    addNew(problemType);
    addBunchOfProblemTypes(problemTypes);
    makeProblemTypesTree(problemTypes, checkedProblems);
}

export default IProblemTypeCollection;
