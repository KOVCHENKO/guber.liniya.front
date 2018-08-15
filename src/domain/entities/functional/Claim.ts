import IProblem from '@/domain/entities/functional/interfaces/IProblem';
import IAddress from '@/domain/entities/functional/interfaces/IAddress';

class Claim {
    public id: number;
    public name: string;
    public description: string;
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public address: IAddress;
    public phone: string;
    public email: string;
    public problem: IProblem;


    constructor(id: number, name: string, description: string, firstName: string,
                middleName: string, lastName: string, phone: string, email: string,
                address: IAddress, problem: IProblem) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.problem = problem;
    }
}

export default Claim;
