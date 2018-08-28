import ICall from '@/domain/entities/functional/interfaces/ICall';

class Call implements ICall {
    public UID: string;
    public account: string;
    public clientPhone: string;
    public duration: number;
    public executorPhone: string;
    public record: string;
    public start: string;
    public type: string;
    public wait: number;


    constructor(UID: string, type: string, clientPhone: string, account: string, executorPhone: string, start: string,
                wait: number, duration: number, record: string) {
        this.UID = UID;
        this.account = account;
        this.clientPhone = clientPhone;
        this.duration = duration;
        this.executorPhone = executorPhone;
        this.record = record;
        this.start = start;
        this.type = type;
        this.wait = wait;
    }
}

export default Call;
