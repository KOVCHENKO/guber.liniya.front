import ProblemType from '@/domain/entities/functional/interfaces/ProblemType';

interface IProblemTypeCollection {
    problemTypes: ProblemType[];
    addNew(problemType);
    addBunchOfProblemTypes(problemTypes);
}

export default IProblemTypeCollection;
