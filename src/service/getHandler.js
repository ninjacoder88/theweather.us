const url = require("url");

var getHandler = {
    handle: function(url){
        const myURL = new URL(url, "http://example.com");
            //console.log(url);
            switch(myURL.pathname){
                case "/":
                    //response.statusCode = 200;
                    //response.end();
                    return {
                        statusCode: 200
                    };
                    //break;
                case "/test":
                    //console.log("fell into /test");
                    let abc = myURL.searchParams.get("abc");

                    //response.statusCode = 200;
                    //response.write("{test: object}");
                    //response.end();
                    return {
                        statusCode: 200,
                        obj: "{test: object}"
                    };
                default:
                    //response.statusCode = 404;
                    //response.end();
                    return {
                        statusCode: 200
                    };
                    //break;
            }
    }
};

module.exports = getHandler;