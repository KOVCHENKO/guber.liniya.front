import IOrganization from '@/domain/entities/functional/interfaces/Organization';

interface IOrganizationCollection {
    organizations: IOrganization[];
    addNew(organization: IOrganization): void;
}

export default IOrganizationCollection;
