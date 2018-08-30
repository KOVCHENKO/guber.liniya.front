export default function throttle(callback, limit) {
    var lastExecution = null;
    return () => {
        clearTimeout(lastExecution);
        lastExecution = setTimeout(() => {
            callback.call();
        }, limit);
    };
}
//# sourceMappingURL=throttle.js.map