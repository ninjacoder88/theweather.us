const http = require("http");
const url = require("url");
const requestHandler = require("./requestHandler");

const server = http.createServer();

requestHandler.get("/test", (obj) => {
    var t = obj.url.searchParams.get('query');//this can be null

    return {
        message: "hello"
    }
});

server.on("request", (request, response) => {
    request.on("error", (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
    });

    response.on("error", (err) => {
        console.error(err);
    });

    const { method, url, headers } = request;
    //const userAgent = headers["user-agent"];

    let body = [];
    request.on("data", (chunk) => {
        body.push(chunk);
    }).on("end", () => {
        body = Buffer.concat(body).toString();
        response.on("error", (err) => {
            console.error(err);
        });
    });

    console.log({
        method: method,
        url: url
    });

    const handledResponse = requestHandler.handle(method, url, body);
    const jsonObj = handledResponse.obj === undefined ? "" : JSON.stringify(handledResponse.obj);

    response.setHeader("Content-Type", "application/json");
    response.statusCode = handledResponse.statusCode;
    response.write(jsonObj);
    response.end();
});

server.listen(8090);