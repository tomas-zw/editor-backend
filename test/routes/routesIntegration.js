process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('documents', () => {
    describe('GET /', () => {
        it('2005 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.collection.should.be.an("array");
                    res.body.data.collection.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('POST /', () => {
        it('201 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/")
                .send({ title: "chai", body: "från chai" })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.doc.should.be.an("object");
                    res.body.data.doc.acknowledged.should.be.an("boolean");

                    done();
                });
        });
    });
});
