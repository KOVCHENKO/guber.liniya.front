export default function throttle(callback, limit) {
    var lastExecution : any = null;
    return () => {
        clearTimeout(lastExecution);
        lastExecution = setTimeout(() => {
            callback.call();
        }, limit);
    };
}
