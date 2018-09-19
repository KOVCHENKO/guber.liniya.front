import {DISPATCHED, EDITED, PREPARED, RAW} from '@/domain/services/functional/roles/interfaces/dispatchStatusTypes';
import IActiveRole from '@/domain/services/functional/roles/interfaces/IActiveRole';
import ClaimService from '@/domain/services/functional/claims/ClaimService';
import ErrorNotifier from '@/domain/util/notifications/ErrorNotifier';

class Dispatcher implements IActiveRole {
    public type: string = 'dispatcher';

    public dispatchStatusOfClaim(dispatchStatus) {
        const dispatchStatusReversed = ClaimService.reverseClaimDispatchStatus(dispatchStatus);

        switch (dispatchStatusReversed) {
                case RAW:
                    return false;
                case PREPARED:
                    return false;
                case EDITED:
                    return true;
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
    public getDispatchStatusToUpdate() {
        return PREPARED;
    }

    /**
     * Статус отправки на создание заявки
     * @returns {string}
     */
    public getDispatchStatusToCreateClaim() {
        return PREPARED;
    }
}

export default Dispatcher;
