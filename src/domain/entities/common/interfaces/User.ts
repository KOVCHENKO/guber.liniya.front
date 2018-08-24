import Organization from '@/domain/entities/functional/interfaces/Organization';

interface User {
    id?: number | undefined;
    email: string | undefined;
    password: string | undefined;
    organization: Organization;
}

export default User;
