var test = {
    getHandlers: {},
    postHandlers: {},
    get: function(url, action){
        this.getHandlers[url] = action;
    },
    post: function(url, action){
        this.postHandlers[url] = action;
    },
    handle: function(method, url, body){
        switch(method){
            case "GET":
                this.getHandlers[url];
        }
    }
};

test.get("key", function(){
    console.log("hello");
});
test.get("key");
console.log(test.getRequests);