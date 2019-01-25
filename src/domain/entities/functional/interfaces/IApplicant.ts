import IAddress from '@/domain/entities/functional/interfaces/IAddress';

interface IApplicant {
    id: number;
    firstname: string;
    lastname: string;
    middlename: string;
    phone: string;
    email: string;
    address: IAddress;
}

export default IApplicant;
