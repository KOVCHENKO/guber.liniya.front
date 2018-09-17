import { DISPATCHED, EDITED, PREPARED, RAW } from '@/domain/services/functional/roles/interfaces/dispatchStatusTypes';
class ClaimService {
    static resolveClaimDispatchStatus(claims) {
        return claims.map((b) => {
            switch (b.dispatch_status) {
                case RAW:
                    b.dispatch_status = 'Необработанна';
                    break;
                case PREPARED:
                    b.dispatch_status = 'Создана';
                    break;
                case EDITED:
                    b.dispatch_status = 'Отредактирована';
                    break;
                case DISPATCHED:
                    b.dispatch_status = 'Отправлена';
                    break;
            }
            return b;
        });
    }
    static reverseClaimDispatchStatus(dispatchStatus) {
        switch (dispatchStatus) {
            case 'Необработанна': return RAW;
            case 'Создана': return PREPARED;
            case 'Отредактирована': return EDITED;
            case 'Отправлена': return DISPATCHED;
        }
    }
    static resolveClaimStatus(claims) {
        return claims.map((b) => {
            switch (b.status) {
                case 'created':
                    b.status = 'Создана';
                    break;
                case 'executed':
                    b.status = 'Выполнена';
                    break;
                case 'rejected':
                    b.status = 'Отказано';
                    break;
                case 'assigned':
                    b.status = 'Назначена';
                    break;
            }
            return b;
        });
    }
    updateClaimInCollection(claims, claim) {
        const subIndex = claims.map((e) => {
            return e.id;
        }).indexOf(claim.id);
        claims[subIndex].name = claim.name;
        claims[subIndex].description = claim.description;
        claims[subIndex].firstname = claim.firstName;
        claims[subIndex].middlename = claim.middleName;
        claims[subIndex].lastname = claim.lastName;
        claims[subIndex].address = claim.address;
        claims[subIndex].phone = claim.phone;
        claims[subIndex].dispatch_status = claim.dispatchStatus;
        claims[subIndex].status = claim.status;
        return claims;
    }
    changeTimeFormat(claims, claim) {
        // change time format
    }
}
export default ClaimService;
//# sourceMappingURL=ClaimService.js.map