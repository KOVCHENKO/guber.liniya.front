import {DISPATCHED, EDITED, PREPARED, RAW} from '@/domain/services/functional/roles/interfaces/dispatchStatusTypes';
import IActiveRole from '@/domain/services/functional/roles/interfaces/IActiveRole';

class Supervisor implements IActiveRole {
    public type: string = 'supervisor';

    public dispatchStatusOfClaim(dispatchStatus) {
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
