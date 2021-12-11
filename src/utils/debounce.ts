export function debounce(func: Function, wait: number) {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
        console.log(args)
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(undefined, args);
        }, wait);

    }
}