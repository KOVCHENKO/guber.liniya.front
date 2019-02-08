import IProblemType from '@/domain/entities/functional/interfaces/IProblemType';

interface IProblemTypeCollection {
    problemTypes: IProblemType[];
    addNew(problemType: IProblemType): any;
    addBunchOfProblemTypes(problemTypes: IProblemType[]): IProblemType[];
    makeProblemTypesTree(problemTypes: IProblemType[], checkedProblems: any): any;
    getProblemTypeIndex(problemTypeId: number): number;
}

export default  IProblemTypeCollection;
