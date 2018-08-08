import Organization from '@/domain/entities/functional/interfaces/Organization';
import IOrganizationCollection from '@/domain/collections/functional/interfaces/IOrganizationCollection';

export default interface OrganizationState {
    organization: Organization;
    organizations: IOrganizationCollection | [{}];
    organizationTree: any;
}
