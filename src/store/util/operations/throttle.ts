export default function throttle(callback, limit) {
    let lastExecution: any = null;
    return () => {
        clearTimeout(lastExecution);
        lastExecution = setTimeout(() => {
            callback.call();
        }, limit);
    };
}
