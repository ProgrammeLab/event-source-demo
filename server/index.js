"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const port = 3006;
const server = http_1.default.createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    routerHandle(request.url || "/", response);
});
const routerHandle = (url, response) => {
    switch (url) {
        case "/":
            break;
        case "/sse":
            response.writeHead(200, {
                connection: "keep-alive",
                // "cache-control": "no-cache",
                "content-type": "text/event-stream",
            });
            recursiveGenString(15, response);
            break;
        default:
            break;
    }
};
server.listen(port, () => {
    console.log("server listening on the port:", port);
});
const LOREM_STRING = "这是一段测试字符串";
const generateWord = () => {
    const randomWordsCount = parseInt(String(Math.random() * LOREM_STRING.length));
    const word = LOREM_STRING.slice(0, randomWordsCount);
    return word;
};
const recursiveGenString = (maxTimes, response) => {
    let count = 0;
    const get = () => {
        return new Promise((resolve, reject) => {
            const responseTime = parseInt(String(Math.random() * 3)) * 1000;
            setTimeout(() => {
                const responseContent = generateWord();
                // 模拟结束
                if (count++ >= maxTimes) {
                    response.end(`data:\n\n`);
                    return;
                }
                else {
                    response.write(`data: ${responseContent || "。"}\n\n`);
                    resolve(1);
                }
            }, responseTime);
        }).then(() => {
            get();
        });
    };
    get();
};
