import IRole from '@/domain/entities/functional/interfaces/IRole';

export default interface RoleState {
    role: IRole;
    roles: IRole[];
}
