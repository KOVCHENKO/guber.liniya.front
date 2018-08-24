import IOrganization from '@/domain/entities/functional/interfaces/Organization';


class Organization implements IOrganization {
    public id: number;
    public name: string;
    public description: string;
    public pid: number;

    constructor(id: number, name: string, description: string, pid: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.pid = pid;
    }
}

export default Organization;
