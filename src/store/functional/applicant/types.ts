import IApplicant from '@/domain/entities/functional/interfaces/IApplicant';

export default interface ApplicantState {
    applicant: IApplicant;
    applicants: IApplicant[];
}