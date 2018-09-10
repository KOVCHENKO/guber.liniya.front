import ICall from '@/domain/entities/functional/interfaces/ICall';

class Call implements ICall {
    public id: number;
    public callId: string;
    public clientPhone: string;
    public link: string;
    public atsStatus: string;
    public type: string;
    public ext: string;
    public processingStatus: string;
    public createdAt: string;


    constructor(id: number, callId: string, clientPhone: string, link: string, atsStatus: string,
                type: string, ext: string, processingStatus: string, createdAt: string) {
        this.id = id;
        this.callId = callId;
        this.clientPhone = clientPhone;
        this.link = link;
        this.atsStatus = atsStatus;
        this.type = type;
        this.ext = ext;
        this.processingStatus = processingStatus;
        this.createdAt = createdAt;
    }
}

export default Call;
