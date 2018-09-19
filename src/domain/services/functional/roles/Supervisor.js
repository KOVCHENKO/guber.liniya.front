import { DISPATCHED, EDITED, PREPARED, RAW } from '@/domain/services/functional/roles/interfaces/dispatchStatusTypes';
import ClaimService from '@/domain/services/functional/claims/ClaimService';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';
class Supervisor {
    constructor() {
        this.type = 'supervisor';
    }
    dispatchStatusOfClaim(dispatchStatus) {
        const dispatchStatusReversed = ClaimService.reverseClaimDispatchStatus(dispatchStatus);
        switch (dispatchStatusReversed) {
            case RAW:
                return false;
            case PREPARED:
                return false;
            case EDITED:
                return false;
            case DISPATCHED:
                return true;
            case undefined:
                return false;
            default:
                ErrorNotifier.notifyWithCustomMessage('Ошибка в обработке статуса отправки');
        }
    }
    /**
     * Статус отправки на обновление заявки
     * @returns {string}
     */
    getDispatchStatusToUpdate() {
        return DISPATCHED;
    }
    /**
     * Статус отправки на создание заявки
     * @returns {string}
     */
    getDispatchStatusToCreateClaim() {
        return EDITED;
    }
}
export default Supervisor;
//# sourceMappingURL=Supervisor.js.map