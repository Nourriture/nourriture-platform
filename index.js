var restify = require('restify');
var server = restify.createServer();

// Mock customer database
var customers = [
    {
        name: "nielssj",
        fullname: "Niels Jensen",
        email: "nm@9la.dk"
    },
    {
        name: "ctverecek",
        fullname: "Pavel Prochazka",
        email: "pprochazka72@gmail.com"
    }
];

// Create - Customer profile
server.post("/customer/:name", function(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
});

// Read - Customer profile
server.get("/customer/:name", function(req, res, next) {
    for (var i = 0; i < customers.length; i++) {
        var customer = customers[i];
        if(customer.name == req.params.name) {
            res.send("Hello " + customer.fullname + "!");
            next();
            return;
        }
    }
    res.send("Who are you?");
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

// Reads (plural) - Customer profile
server.get("/customer", function(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
});


server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});