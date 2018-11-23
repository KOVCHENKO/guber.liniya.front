import IClaim from '@/domain/entities/functional/interfaces/IClaim';
import IFile from '@/domain/entities/functional/interfaces/IFile';

export default interface ClaimState {
    claim: IClaim;
    claims: IClaim[];
    previousClaims: [{}] | any;
    executedClaims: [{}] | any;
    confirmationFiles: IFile[];
    responsibleOrganizations: [{}];
}
