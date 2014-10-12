var restify = require('restify');
var server = restify.createServer();

// Create - Customer profile
server.post("/customer/:name", function(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
});
// Read - Customer profile
server.get("/customer/:name", function(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
});
// Update - Customer profile
server.put("/customer/:name", function(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
});
// Delete - Customer profile
server.del("/customer/:name", function(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});