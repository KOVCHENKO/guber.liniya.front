import { DISPATCHED, EDITED, PREPARED, RAW } from '@/domain/services/functional/roles/interfaces/dispatchStatusTypes';
class Editor {
    constructor() {
        this.type = 'editor';
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
    getDispatchStatusToUpdate() {
        return EDITED;
    }
}
export default Editor;
//# sourceMappingURL=Editor.js.map