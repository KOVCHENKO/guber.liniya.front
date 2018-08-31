class Editor {
    constructor() {
        this.type = 'editor';
    }
    dispatchStatusOfClaim(dispatchStatus) {
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
//# sourceMappingURL=Editor.js.map