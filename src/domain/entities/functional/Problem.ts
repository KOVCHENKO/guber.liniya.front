import IProblem from '@/domain/entities/functional/interfaces/IProblem';

class Problem implements IProblem {
    public id: number;
    public name: string;
    public description: string;


    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

export default Problem;
