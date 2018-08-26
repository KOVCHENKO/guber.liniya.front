class ProblemCollection {
    constructor(problems) {
        this.problems = problems;
    }
    add(problem) {
        this.problems.push(problem);
    }
    addNewProblem(problemType, newProblem) {
        newProblem.opened = false;
        newProblem.disabled = true;
        newProblem.text = newProblem.name;
        newProblem.icon = 'fas fa-exclamation';
        newProblem.type = 'problem';
        problemType.push(newProblem);
        return problemType;
    }
}
export default ProblemCollection;
//# sourceMappingURL=ProblemCollection.js.map