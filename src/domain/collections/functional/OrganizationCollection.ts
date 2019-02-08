import IOrganization from '@/domain/entities/functional/Organization';
import IOrganizationCollection from '@/domain/collections/functional/interfaces/IOrganizationCollection';

class OrganizationCollection implements IOrganizationCollection {
    public organizations: IOrganization[];

    constructor(organizations: IOrganization[]) {
        this.organizations = organizations;
    }

    public addNew(organization: IOrganization) {
        this.organizations.push(organization);
    }
}

export default OrganizationCollection;
