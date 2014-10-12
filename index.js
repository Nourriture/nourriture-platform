var restify = require('restify');
var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());


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
    if(req.body) {
        customers.push(req.body);
        res.send(req.body);
        next();
    } else {
        next(new restify.InvalidContentError("No user submitted for creation"));
    }
});

// Read - Customer profile
server.get("/customer/:name", function(req, res, next) {
    for (var i = 0; i < customers.length; i++) {
        var customer = customers[i];
        if(customer.name == req.params.name) {
            res.send(customer);
            return;
        }
    }
    next(new restify.ResourceNotFoundError("No user found with the given username"));
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
    res.send(customers);
    next();
});


server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});