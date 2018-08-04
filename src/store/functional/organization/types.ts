import Organization from '@/domain/entities/functional/interfaces/Organization';
import OrganizationCollection from '@/domain/collections/functional/interfaces/OrganizationCollection';

export default interface OrganizationState {
    organization: Organization | undefined;
    organizations: OrganizationCollection | undefined;
}
