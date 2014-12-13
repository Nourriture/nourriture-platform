/**
 * Created by Pavel Prochazka on 22/10/14.
 * Module for all company specific API calls.
 */

var restify = require('restify');
var crypto = require('crypto');

module.exports = function (server, nconf) {
    var uploadSizeLimit = 1048576; // bytes

    // Retrieve a policy token that allows image upload for a specific company
    server.get('/upload/company/token/:username', function (req, res, next) {
        console.log('Upload token requests for "' + req.params.username + '"');

        // TODO: Add authorization and ensure users only can upload with filename of their own username

        var s3Policy = {
            "expiration": "2014-12-14T12:00:00.000Z", // hard coded for testing
            "conditions": [
                ["starts-with", "$key", "cocacola"],
                {"bucket": "nourriture-consumer"},
                {"acl": "public-read"},
                ["starts-with", "$Content-Type", "image/"],
                ["content-length-range", 0, uploadSizeLimit]
            ]
        };

        // stringify and encode the policy
        var stringPolicy = JSON.stringify(s3Policy);
        var base64Policy = Buffer(stringPolicy, "utf-8").toString("base64");

        // sign the base64 encoded policy
        var signature = crypto.createHmac("sha1", nconf.get("amazon").secretAccessKey)
            .update(new Buffer(base64Policy, "utf-8")).digest("base64");

        res.send({
            s3Policy: base64Policy,
            s3Signature: signature
        });
        next();
    });
};