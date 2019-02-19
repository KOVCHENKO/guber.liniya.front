import IProblemTypeCollection from '@/domain/collections/functional/interfaces/IProblemTypeCollection';
import {getSelectedNodes} from '@/domain/util/interface/TreeMaker';
import IProblemType from '@/domain/entities/functional/interfaces/IProblemType';


export class ProblemTypeCollection implements IProblemTypeCollection {
    public problemTypes!: IProblemType[];

    constructor(problemTypes: IProblemType[]) {
        this.problemTypes = problemTypes;
    }

    public addNew(problemType: IProblemType): void {
        this.problemTypes.push(problemType);
    }

    public addBunchOfProblemTypes(problemTypes: IProblemType[]) {

        for (const problemType of problemTypes) {
            problemType.opened = false;
            problemType.disabled = false;
            problemType.text = problemType.name;
            problemType.icon = 'fas fa-exclamation-circle';
            problemType.type = 'problemType';

            // @ts-ignore
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
    public addNewProblemTypeToCollection(problemTypes: IProblemType[], newProblemType: IProblemType) {
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
    public makeProblemTypesTree(problemTypes: IProblemType[], checkedProblems: any) {
        for (const problemType of problemTypes) {
            problemType.text = problemType.name;
            problemType.opened = true;
            problemType.disabled = true;

            // @ts-ignore
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
    public getProblemTypeIndex(problemTypeId: any) {
        return this.problemTypes.map((e) => {
            return e.id;
        }).indexOf(parseInt(problemTypeId, 10));
    }

    public changeData(problemTypes: IProblemType[], problemType: IProblemType) {
        const subIndex = problemTypes.map((e) => {
            return e.id;
        }).indexOf(problemType.id);

        problemTypes[subIndex].name = problemType.name;
        problemTypes[subIndex].description = problemType.description;
        problemTypes[subIndex].text = problemType.name;

        return problemTypes;

    }
}
