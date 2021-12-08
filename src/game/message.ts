import { io, Socket } from "socket.io-client"

let socket: Socket;
export function initMessage() {
    socket = io('http://localhost:3001')
    socket.on("connect", () => {
        console.log('链接成功')
    })

    socket.on("hello", (arg) => {
        console.log(arg)
    })
}
export const message = {
    on(...args: [ev: string, listener: (...args: any[]) => void]) {
        return socket.on(...args);
    },
    emit(...args: [ev: string, listener?: any]) {
        return socket.emit(...args);
    },
}
// export function onMessage(...args: [ev: string, listener: (...args: any[]) => void]) {
//     return socket.on(...args);
// }