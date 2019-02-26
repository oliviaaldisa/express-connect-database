let server = require('../app');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
let CONFIG = require('../config/config');

describe('Categories', () => {

    describe('# GET All categories', () => {
        it('it should GET all the categories', (done) => {
            chai.request(server)
                .get('/v1/category')
                .set('accesstoken', CONFIG.unittest_token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });
    });
    
});