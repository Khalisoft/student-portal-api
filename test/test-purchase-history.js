const chai = require('chai');
const chaiHttp = require('chai-http');
const { DATABASE_URL } = require('../config');
const { app, runServer, closeServer } = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);


describe('Purchase History', function () {
  before(function () {
    return runServer(DATABASE_URL);
  });

  after(function () {
    return closeServer();
  });

  it('should post purchased item on POST', function () {
    return chai.request(app)
      .post('/api/auth/login')
      .send({ username: 'testUser', password: 'password12' })
      .then(function (res) {
        return chai.request(app)
          .post('/api/purchase-history/')
          .set('Authorization', `Bearer ${res.body.authToken}`)
          .send({ package: 'testPackage', purchaseDate: 'testPurchaseDate', userId: '5b9888802f26961a7424cf92' })
          .then(function (res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
          })
          .catch(function (err) {
            console.log('this is the log of', err);
          });
      })
      .catch(function (err) {
        console.log(err);
      })
  });
  it('should list purchased items history on GET', function () {
    return chai.request(app)
      .post('/api/auth/login')
      .send({ username: 'testUser', password: 'password12' })
      .then(function (res) {
        return chai.request(app)
          .get('/api/purchase-history/5b9888802f26961a7424cf92')
          .set('Authorization', `Bearer ${res.body.authToken}`)

          .then(function (res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
          })
          .catch(function (err) {
            console.log('this is the log of', err);
          });
      })
      .catch(function (err) {
        console.log(err);
      })
  });
});
