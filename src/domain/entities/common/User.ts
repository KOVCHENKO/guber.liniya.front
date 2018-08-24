import Organization from '@/domain/entities/functional/interfaces/Organization';
import IUser from '@/domain/entities/common/interfaces/User';

class User implements IUser  {
    public id: number;
    public email: string;
    public password: string;
    public organization: Organization;

    constructor(id: number, email: string, password: string, organization: Organization) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.organization = organization;
    }
}

export default User;
