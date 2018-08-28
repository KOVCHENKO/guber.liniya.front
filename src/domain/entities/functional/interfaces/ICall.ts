interface ICall {
    UID: string;
    type: string;
    clientPhone: string;
    account: string;
    executorPhone: string;
    start: string;
    wait: number;
    duration: number;
    record: string;
}

export default ICall;
