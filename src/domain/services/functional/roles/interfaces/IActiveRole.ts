export default interface IActiveRole {
    type: string;
    dispatchStatusOfClaim(dispatchStatus);
    getDispatchStatusToUpdate();
}
