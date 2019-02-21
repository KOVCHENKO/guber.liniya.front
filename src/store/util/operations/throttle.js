export default function throttle(callback, limit) {
    let lastExecution = null;
    return () => {
        clearTimeout(lastExecution);
        lastExecution = setTimeout(() => {
            console.log(callback);
            callback.call();
        }, limit);
    };
}
//# sourceMappingURL=throttle.js.map