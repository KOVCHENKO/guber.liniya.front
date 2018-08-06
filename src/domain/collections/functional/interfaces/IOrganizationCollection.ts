import Organization from '@/domain/entities/functional/interfaces/Organization';

interface IOrganizationCollection {
    organizations: Organization[];
    addNew(organization);
}

export default IOrganizationCollection;
