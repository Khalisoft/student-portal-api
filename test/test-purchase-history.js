const chai = require('chai');
const chaiHttp = require('chai-http');
const { DATABASE_URL } = require('../config');

// Import server.js and use destructuring assignment to create variables for
// server.app, server.runServer, and server.closeServer
const {app, runServer, closeServer} = require('../server');

// declare a variable for expect from chai import
const expect = chai.expect;

chai.use(chaiHttp);


describe('Purchase History', function() {
  // Before our tests run, we activate the server. Our `runServer`
  // function returns a promise, and we return the promise by
  // doing `return runServer`. If we didn't return a promise here,
  // there's a possibility of a race condition where our tests start
  // running before our server has started.
  before(function() {
    
    return runServer(DATABASE_URL);
  });

  // Close server after these tests run in case
  // we have other test modules that need to 
  // call `runServer`. If server is already running,
  // `runServer` will error out.
  after(function() {
    return closeServer();
  });
  // `chai.request.get` is an asynchronous operation. When
  // using Mocha with async operations, we need to either
  // return an ES6 promise or else pass a `done` callback to the
  // test that we call at the end. We prefer the first approach, so
  // we just return the chained `chai.request.get` object.

  it('should post purchased item on POST', function() {
    return chai.request(app)
      .post('/api/auth/login')
      .send({username: 'testUser', password: 'password12'})
      .then(function(res) {
            return chai.request(app) 
              .post('/api/purchase-history/')
              .set('Authorization', `Bearer ${res.body.authToken}`)
              .send({package: 'testPackage', purchaseDate: 'testPurchaseDate', userId: '5b9888802f26961a7424cf92'})
              .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
              })
              .catch(function(err) {
                console.log('this is the log of', err);
              });
      })
      .catch(function(err) {
        console.log(err);
      })      
  });
  it('should list purchased items history on GET', function() {
    return chai.request(app)
      .post('/api/auth/login')
      .send({username: 'testUser', password: 'password12'})
      .then(function(res) {
            return chai.request(app) 
              .get('/api/purchase-history/5b9888802f26961a7424cf92')
              .set('Authorization', `Bearer ${res.body.authToken}`)

              .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
              })
              .catch(function(err) {
                console.log('this is the log of', err);
              });
      })
      .catch(function(err) {
        console.log(err);
      })
 });
});
