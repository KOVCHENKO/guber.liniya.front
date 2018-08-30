import {DISPATCHED, EDITED, PREPARED, RAW} from '@/domain/services/functional/roles/interfaces/dispatchStatusTypes';
import IActiveRole from '@/domain/services/functional/roles/interfaces/IActiveRole';

class Editor implements IActiveRole {
    public type: string = 'editor';

    public dispatchStatusOfClaim(dispatchStatus: string) {
        switch (dispatchStatus) {
            case 'raw':
                return false;
            case 'prepared':
                return false;
            case 'edited':
                return false;
            case 'dispatched':
                return true;
        }
    }
}

export default Editor;
