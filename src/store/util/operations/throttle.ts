export default function throttle(callback: any, limit: any) {
    let lastExecution: any = null;
    return () => {
        clearTimeout(lastExecution);
        lastExecution = setTimeout(() => {
            callback.call();
        }, limit);
    };
}
