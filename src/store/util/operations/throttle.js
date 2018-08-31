export default function throttle(callback, limit) {
    let lastExecution = null;
    return () => {
        clearTimeout(lastExecution);
        lastExecution = setTimeout(() => {
            callback.call();
        }, limit);
    };
}
//# sourceMappingURL=throttle.js.map