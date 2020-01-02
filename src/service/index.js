const http = require("http");

const server = http.createServer();

server.on("request", (request, response) => {
    request.on("error", (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
    });

    response.on("error", (err) => {
        console.error(err);
    });


    //some magic
    const { method, url } = request;
    const { headers } = request;
    const userAgent = headers["user-agent"];

    switch(method){
        case "POST":
            response.statusCode = 405;
            response.end();
            break;
        case "GET":
            switch(url){
                case "/":
                    response.statusCode = 200;
                    response.write("{test: object}");
                    response.end();
                    break;
                default:
                    response.statusCode = 404;
                    response.end();
                    break;
            }
            break;
        default:
            response.statusCode = 404;
            response.end();
            break;
    }
});

server.listen(8090);

/*
let body = [];

    request.on("error", (err) => {
        console.error(err);
    }).on("data", (chunk) => {
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