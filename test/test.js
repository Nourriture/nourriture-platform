/**
 * Created by Pavel Prochazka on 12/12/14.
 */

var expect = require('chai').expect
var supertest = require('supertest')  //provides a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by super-agent
var request = supertest('http://localhost:2121')

//before(){}
//after

describe('Company module API tests', function() {   //MOCHA test name

    var companyUsername //will be assigned upon POST response
    var invalidUsername = "!#$%^&" //for testing the fail scenarios

    it('POST a company, with required fields', function (done) {    //MOCHA test cases
        request.post('/company')
            .set('Content-Type', 'application/json')
            .send('{"name":"Helmans","username":"helmans"}')
            .expect(200)                                            //NOTE: .expect is part of the supertest module
            .end(function(error,response){
                //console.log(response.body)
                expect(error).to.equal(null)                        //NOTE: expect is part of the chai module
                expect(response.body._id).is.not.empty
                companyUsername = response.body.username
                done()
            })
    })

    it('POST a company, without all required fields', function (done) {    //MOCHA test cases
        request.post('/company')
            .set('Content-Type', 'application/json')
            .send('{"name":"tobi"}')
            .expect(400)
            .end(function(error, response){
                if (error)
                    return done(error);   //pass err to done() in order to fail the test case FAIL (SUCCESS scenario)
                done()                    //passes the test PASS (FAIL scenerio)
            });
    })


    it('GET a specific company, valid company username', function(done){
        request.get('/company/' + companyUsername)
            .set('Content-Type', 'application/json')
            .expect(200, done);
    })

    it('GET a specific company, invalid company username', function(done){
        request.get('/company/' + invalidUsername)
            .set('Content-Type', 'application/json')
            .expect(404)
            .end(function(error,response){
                expect(response.body.message).to.eql('No company found with the given company username')
                done()
            })
    })


    it('GET company with search, empty search', function(done){
        request.get('/company')
            .query({ search: '' })
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(error,response){
                expect(error).to.equal(null)
                expect(response).to.be.an('object')
                done()
            })
    })

    it('GET company with search, valid company username', function(done){
        request.get('/company')
            .query({ search: companyUsername })
            .set('Content-Type', 'application/json')
            .expect(200, done)  //remember to pass done!
    })


    it('PUT a company, with valid username', function (done) {    //MOCHA test cases

        var logoURL = "http://img4.myrecipes.com/i/sponsor-recipe-logos/hellmanns_logo-150.png"
        var newCompanyName = "Helmans ApS"

        request.put('/company/' + companyUsername)
            .set('Content-Type', 'application/json')
            .send({name:newCompanyName})
            .send({logo:logoURL})
            .expect(200)
            .end(function (error,response){
                expect(response.body.logo).to.eql(logoURL)          //check if attributes of the returned object got really updated
                expect(response.body.name).to.eql(newCompanyName)
                done()
            })
    })

    it('PUT a company, with invalid username', function(done){
        request.put('/company/' + invalidUsername)
            .set('Content-Type', 'application/json')
            .expect(404)
            .end(function(error,response){
                expect(response.body.message).to.eql('No company found with the given username')
                done()
            })
    })


    it('DELETE a company, with valid username', function (done) {    //MOCHA test cases
        request.del('/company/' + companyUsername)
            .set('Content-Type', 'application/json')
            .expect(200, done)
    })

    it('DELETE a company, with invalid username', function(done){
        request.put('/company/' + invalidUsername)
            .set('Content-Type', 'application/json')
            .expect(404)
            .end(function(error,response){
                expect(response.body.message).to.eql('No company found with the given username')
                done()
            })
    })

})


describe('Authentication module API tests', function() {

 /*it('errors if wrong basic auth', function(done) {
 api.get('/blog')
 .set('x-api-key', '123myapikey')
 .auth('incorrect', 'credentials')
 .expect(401, done)
 });

 it('errors if bad x-api-key header', function(done) {
 api.get('/blog')
 .auth('correct', 'credentials')
 .expect(401)
 .expect({error:"Bad or missing app identification header"}, done);
 });*/

 })
