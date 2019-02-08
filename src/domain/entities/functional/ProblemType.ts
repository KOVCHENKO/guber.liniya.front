import IProblemType from '@/domain/entities/functional/interfaces/IProblemType';

class ProblemType implements IProblemType {
    public id: number;
    public name: string;
    public description: string;

    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public push(newProblemType: IProblemType) {
        // empty interface method
    }
}

export default ProblemType;
