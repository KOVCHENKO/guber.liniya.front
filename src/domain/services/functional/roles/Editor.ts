import {DISPATCHED, EDITED, PREPARED, RAW} from '@/domain/services/functional/roles/interfaces/dispatchStatusTypes';
import IActiveRole from '@/domain/services/functional/roles/interfaces/IActiveRole';

class Editor implements IActiveRole {
    public type: string = 'editor';

    public dispatchStatusOfClaim(dispatchStatus: string) {
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

    public getDispatchStatusToUpdate() {
        return EDITED;
    }
}

export default Editor;
