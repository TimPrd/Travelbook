process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Card = require('../models/card');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('CARD', () => {
    beforeEach((done) => { //Before each test we empty the database
        Card.remove({}, (err) => { 
           done();         
        });     
    });

/*
 * Test the /GET route
 */
  describe('/GET book', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/cards')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});