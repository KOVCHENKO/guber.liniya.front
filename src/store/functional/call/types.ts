import ICall from '@/domain/entities/functional/interfaces/ICall';

export default interface CallState {
    call: ICall;
    calls: ICall[] | any;
    filter: {
        dateFilter: string;
        from: string;
        to: string;
    };
}
