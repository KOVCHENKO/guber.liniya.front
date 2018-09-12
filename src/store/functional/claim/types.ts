import IClaim from '@/domain/entities/functional/interfaces/IClaim';

export default interface ClaimState {
    claim: IClaim;
    claims: IClaim[];
    previousClaims: [{}] | any;
    executedClaims: [{}] | any;
}
