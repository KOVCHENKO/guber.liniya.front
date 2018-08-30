import { DISPATCHED, EDITED, PREPARED, RAW } from '@/domain/services/functional/roles/interfaces/dispatchStatusTypes';
class Supervisor {
    constructor() {
        this.type = 'supervisor';
    }
    dispatchStatusOfClaim(dispatchStatus) {
        switch (dispatchStatus) {
            case RAW:
                return false;
            case PREPARED:
                return false;
            case EDITED:
                return false;
            case DISPATCHED:
                return true;
        }
    }
}
export default Supervisor;
//# sourceMappingURL=Supervisor.js.map