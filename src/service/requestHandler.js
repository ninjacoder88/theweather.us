const url = require("url");

var requestHandler = {
    getHandlers: {},
    //postHandlers: {},
    get: function(url, action){
        if(url === null || url === undefined)
        {
            return;
        }
        this.getHandlers[url] = action;
    },
    // post: function(url, action){
    //     if(url === null || url === undefined)
    //     {
    //         return;
    //     }
    //     this.postHandlers[url] = action;
    // },
    handle: function(method, url, body){
        const myURL = new URL(url, "http://example.com");
        switch(method){
            case "GET":
                const handler = this.getHandlers[myURL.pathname];

                if(handler === undefined){
                    return {
                        statusCode: 404
                    }
                }
                
                const obj = handler({url: myURL, body: body});
                
                return {
                    statusCode: 200,
                    obj: obj
                }
            default:
                return {
                    statusCode: 405,
                    obj: {
                        message: method + "is not supported"
                    }
                }
        }
    }
};

module.exports = requestHandler;