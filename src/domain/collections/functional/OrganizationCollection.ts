import Organization from '@/domain/entities/functional/Organization';
import IOrganizationCollection from '@/domain/collections/functional/interfaces/IOrganizationCollection';

class OrganizationCollection implements IOrganizationCollection {
    public organizations: Organization[];

    constructor(organizations: Organization[]) {
        this.organizations = organizations;
    }

    public addNew(organization) {
        this.organizations.push(organization);
    }
}

export default OrganizationCollection;
