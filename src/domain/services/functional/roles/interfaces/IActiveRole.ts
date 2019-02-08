export default interface IActiveRole {
    type: string;
    dispatchStatusOfClaim(dispatchStatus: string): boolean | undefined;
    getDispatchStatusToUpdate(): string;
}
