var restify = require('restify');

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

var port = 8080;
if (process.argv[2]) {
    var port = parseInt(process.argv[2]);
}

server.listen(port, function() {
    console.log('%s listening at %s', server.name, server.url);
});