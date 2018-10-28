import mongoose from 'mongoose';
import { expect } from 'chai';
import User from '../../../src/services/user/user.model';
import connectDatabase from "../../../src/utils/db";
import config from "../../../src/config/db";

describe('User model', () => {
  before(() => {
    connectDatabase(config.test);
  });

  after(done => {
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });

  it('should be invalid if email is empty', done => {
    const user = new User({ password: 'xyz' });

    user.validate(function (err) {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it('should be invalid if password is empty', done => {
    const user = new User({ email: 'xyz' });

    user.validate(function (err) {
      expect(err.errors.password).to.exist;
      done();
    });
  });

  it('should save user if username and password are valid', done => {
    const user = new User({ email: 'testing@testing.com', password: 'testing@123' });

    user.validate(function (err) {
      expect(err).to.not.exist;
      done();
    });
  });

  it('should have created_at and updated_at dates', () => {
    const user = new User({ email: 'testing@testing.com', password: 'testing@123' });

    return user.save()
      .then(user => {
        expect(user.createdAt).to.exist;
        expect(user.createdAt).to.be.an.instanceOf(Date);
        expect(user.updatedAt).to.exist;
        expect(user.updatedAt).to.be.an.instanceOf(Date);
        user.remove();
      });
  });


});
