// ticker
let startTime = performance.now();
function handleFrame() {
    let time = performance.now() - startTime;
    tickers.forEach((ticker) => {
        ticker.fn.call(ticker.listener, time);
    });
    startTime = performance.now();
    requestAnimationFrame(handleFrame);
}
requestAnimationFrame(handleFrame);

const tickers: Array<{ fn: Function; listener: any }> = [];
export function addTicker(fn: Function, listener: any) {
    tickers.push({ fn, listener });

}
export function removeTicker(fn: Function, listeners: any) {
    for (let i = 0; i < tickers.length; i++) {
        if (tickers[i].fn === fn && tickers[i].listener === listeners) {
            tickers.splice(i, 1);
        }
    }
}