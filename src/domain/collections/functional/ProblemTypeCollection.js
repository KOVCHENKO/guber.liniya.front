import { getSelectedNodes } from '@/domain/util/interface/TreeMaker';
export class ProblemTypeCollection {
    constructor(problemTypes) {
        this.problemTypes = problemTypes;
    }
    addNew(problemType) {
        this.problemTypes.push(problemType);
    }
    addBunchOfProblemTypes(problemTypes) {
        for (const problemType of problemTypes) {
            problemType.opened = false;
            problemType.disabled = false;
            problemType.text = problemType.name;
            problemType.icon = 'fas fa-exclamation-circle';
            problemType.type = 'problemType';
            for (const problem of problemType.children) {
                problem.opened = false;
                problem.text = problem.name;
                problem.disabled = true;
                problem.icon = 'fas fa-exclamation';
                problem.type = 'problem';
            }
        }
        return problemTypes;
    }
    /**
     * Добавить новый тип проблемы к коллекции
     * @param problemTypes
     * @param newProblemType
     * @returns {any}
     */
    addNewProblemTypeToCollection(problemTypes, newProblemType) {
        newProblemType.opened = false;
        newProblemType.disabled = false;
        newProblemType.text = newProblemType.name;
        newProblemType.icon = 'fas fa-exclamation-circle';
        newProblemType.type = 'problemType';
        problemTypes.push(newProblemType);
        return problemTypes;
    }
    /**
     * @param problemTypes - типы проблемы
     * @param checkedProblems - массив ид - проблемы, которые уже отмечены для организаций
     * @returns {any}
     */
    makeProblemTypesTree(problemTypes, checkedProblems) {
        for (const problemType of problemTypes) {
            problemType.text = problemType.name;
            problemType.opened = true;
            problemType.disabled = true;
            for (const problem of problemType.children) {
                problem.text = problem.name;
                problem.opened = true;
                problem.selected = false;
            }
        }
        return getSelectedNodes(problemTypes, checkedProblems);
    }
    /**
     * Получить индекс problemTYpe
     * @param problemTypeId
     * @returns {number}
     */
    getProblemTypeIndex(problemTypeId) {
        return this.problemTypes.map((e) => {
            return e.id;
        }).indexOf(parseInt(problemTypeId, 10));
    }
    changeData(problemTypes, problemType) {
        const subIndex = problemTypes.map((e) => {
            return e.id;
        }).indexOf(problemType.id);
        problemTypes[subIndex].name = problemType.name;
        problemTypes[subIndex].description = problemType.description;
        problemTypes[subIndex].text = problemType.name;
        return problemTypes;
    }
}
//# sourceMappingURL=ProblemTypeCollection.js.map