import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../../build';

chai.use(chaiHttp);

describe('GET /ping route', function() {
  it('should return success', done => {
    chai.request(server)
      .get('/ping')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal('success');
        done();
      })
  });
});