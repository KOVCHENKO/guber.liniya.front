class ProblemTypeCollection {
    constructor(problemTypes) {
        this.problemTypes = problemTypes;
    }
    addNew(problemType) {
        this.problemTypes.push(problemType);
    }
    addBunchOfProblemTypes(problemTypes) {
        this.problemTypes = problemTypes;
    }
    makeProblemTypesTree(problemTypes) {
        for (const problemType of problemTypes) {
            problemType.text = problemType.name;
            problemType.opened = true;
            for (const problem of problemType.children) {
                problem.text = problem.name;
                problem.opened = true;
            }
        }
        return problemTypes;
    }
}
export default ProblemTypeCollection;
//# sourceMappingURL=ProblemTypeCollection.js.map