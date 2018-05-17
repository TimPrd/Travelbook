process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Card = require('../models/card');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let shortid = require("shortid");

chai.use(chaiHttp);
describe('CARD', () => {
    /*
    //Before each test we clean the database
    beforeEach((done) => {
        Card.remove({}, (err) => { 
           done();         
        });     
    });*/

    describe('/GET book', () => {
        it('it should GET all the cards', (done) => {
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

    describe('/POST book', () => {
        it('it should POST a card with good adress', (done) => {
        let card = {
            id:'418',
            title: 'Title',
            author: 'Author',
            para1: 'Paragraph 1',
            para2: 'Paragraph 2',
            adress: '4 Place Jussieu, 75005 Paris, France',
            category: 'hotel',
            pictures:['1','2','3']
        }
        chai.request(server)
        .post('/card')
        .send(card)
        .end((err, res) => {
            res.body.should.be.a('object');
            res.body.card.should.have.property('title');
            res.body.card.should.have.property('author');
            res.body.card.should.have.property('para1');
            res.body.card.should.have.property('para2');
            res.body.card.should.have.property('country');
            res.body.card.should.have.property('id').eql(card.id);
            done();
            });
        });
    })


    describe('/GET/:id card', () => {
        it('it should GET a card by its given id', (done) => {
        let card = new Card({
            id:'418',
            title: 'Title',
            author: 'Author',
            para1: 'Paragraph 1',
            para2: 'Paragraph 2',
            adress: '4 Place Jussieu, 75005 Paris, France',
            category: 'hotel',
            pictures:['1','2','3']
        });
        card.save((err, card) => {
            chai.request(server)
            .get('/card/' + card.id)
            .send(card)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('author');
                res.body.should.have.property('category');
                res.body.should.have.property('id').eql(card.id);
            done();
            });
        });
        });
    });
    describe('/DELETE/:id card', () => {
        it('it should DELETE a card by its id', (done) => {
            let card = new Card({
                id:'418',
                title: 'Title',
                author: 'Author',
                para1: 'Paragraph 1',
                para2: 'Paragraph 2',
                adress: '4 Place Jussieu, 75005 Paris, France',
                category: 'hotel',
                pictures:['1','2','3']
            });
            card.save((err, card) => {
                  chai.request(server)
                  .delete('/card/' + card.id)
                  .end((err, res) => {
                      res.should.have.status(200);
                    done();
                  });
            });
        });
    });
});