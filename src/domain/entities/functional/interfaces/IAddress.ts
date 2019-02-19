// TODO: Поменять структуру Адреса
interface IAddress {
    id: number;
    district: string;
    location?: string;
    city?: string;
    street?: string;
    building?: string;
}

export default IAddress;
