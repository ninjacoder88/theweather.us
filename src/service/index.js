const http = require("http");
const url = require("url");
const getHandler = require("./getHandler.js");
const requestHandler = require("./requestHandler");

const server = http.createServer();

requestHandler.get("/test", (req) => {

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

    const { method, url } = request;
    const { headers } = request;
    const userAgent = headers["user-agent"];

    let body = [];
    request.on("data", (chunk) => {
        body.push(chunk);
    }).on("end", () => {
        body = Buffer.concat(body).toString();
        response.on("error", (err) => {
            console.error(err);
        });
    });

    var handledResponse = requestHandler.handle(method, url, body);
    
    response.statusCode = handledResponse.statusCode;
    response.write(handledResponse.obj);
    response.end();

    // switch(method){
    //     case "POST":
    //         response.statusCode = 405;
    //         response.end();
    //         break;
    //     case "GET":
    //         var obj = getHandler.handle(url);
    //         response.statusCode = obj.statusCode;
    //         response.write(obj.obj);
    //         response.end();
    //         break;
    //     default:
    //         response.statusCode = 404;
    //         response.end();
    //         break;
    // }
});

server.listen(8090);

/*
let body = [];

    request.on("data", (chunk) => {
        body.push(chunk);
    }).on("end", () => {
        body = Buffer.concat(body).toString();
        response.on("error", (err) => {
            console.error(err);
        });
    });

    response.setHeader("Content-Type", "application/json");
    response.statusCode = 200;

    const responseBody = { headers, method, url, body };

    response.write(JSON.stringify(responseBody));
    response.end();
    */