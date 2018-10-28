import { assert } from 'chai';
import mongoose from 'mongoose';
import { connectDatabase } from '../../src/utils';
import config from '../../src/config/db';

describe('Database test', () => {
  it('Connects to Database successfully', done => {
    const db = connectDatabase(config.test);

    db.on('error', err => {
      assert(false, err.message);
      done();
    });

    db.on('open', () => {
      done();
    });
  });

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});
