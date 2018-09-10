import { DISPATCHED, EDITED, PREPARED, RAW } from '@/domain/services/functional/roles/interfaces/dispatchStatusTypes';
class Dispatcher {
    constructor() {
        this.type = 'dispatcher';
    }
    dispatchStatusOfClaim(dispatchStatus) {
        switch (dispatchStatus) {
            case RAW:
                return false;
            case PREPARED:
                return false;
            case EDITED:
                return true;
            case DISPATCHED:
                return true;
        }
    }
    getDispatchStatusToUpdate() {
        return PREPARED;
    }
}
export default Dispatcher;
//# sourceMappingURL=Dispatcher.js.map