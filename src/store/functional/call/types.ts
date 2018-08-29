import ICall from '@/domain/entities/functional/interfaces/ICall';

export default interface CallState {
    call: ICall;
    calls: ICall[];
    crmToken: string;
    crmAddress: string;
}
