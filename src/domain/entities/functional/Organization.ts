import IOrganization from '@/domain/entities/functional/interfaces/Organization';


class Organization implements IOrganization {
    public id: number;
    public name: string;
    public description: string;
    public pid: number | null;

    constructor(id: number, name: string, description: string, pid: number | null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.pid = pid;
    }
}

export default Organization;
