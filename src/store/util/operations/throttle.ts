export default function throttle(callback: any, limit: any) {
    let lastExecution: any = null;
    return () => {
        clearTimeout(lastExecution);
        lastExecution = setTimeout(() => {
            console.log(callback);
            callback.call();
        }, limit);
    };
}
