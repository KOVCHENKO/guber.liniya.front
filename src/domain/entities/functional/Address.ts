import IAddress from '@/domain/entities/functional/interfaces/IAddress';

class Address implements IAddress {

    public id: number;
    public district: string;
    public location: string;

    constructor(id: number, district: string, location: string) {
        this.id = id;
        this.district = district;
        this.location = location;
    }

}

export default Address;

export const districts: string[] = [
    'Астрахань',
    'Камызякский',
    'Енотаевский',
    'Икрянинский',
    'Красноярский',
    'Знаменск',
];
