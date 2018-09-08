import {DISPATCHED, EDITED, PREPARED, RAW} from '@/domain/services/functional/roles/interfaces/dispatchStatusTypes';
import IActiveRole from '@/domain/services/functional/roles/interfaces/IActiveRole';

class Dispatcher implements IActiveRole {
    public type: string = 'dispatcher';

    public dispatchStatusOfClaim(dispatchStatus) {
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

    public getDispatchStatusToUpdate() {
        return PREPARED;
    }
}

export default Dispatcher;
