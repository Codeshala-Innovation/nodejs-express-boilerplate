import { expect } from 'chai';
import mock from 'mock-fs';
import { findRoutes } from "../../src/utils/autoLoadRoutes";

const mockFiles = {
  'services/user/user.routes.js': '// user route',
  'services/user/user.controller.js': '// user controller',
  'services/custom/custom.routes.js': '// user route',
  'services/index.js': '// js file'
};

describe('Autoload routes', () => {
  before(() => {
    mock(mockFiles);
  });

  after(() => {
    mock.restore();
  });

  it('Find all the route file', done => {
    findRoutes('services', (err, files) => {
      if (err) {
        expect(false, err.message);
      }
      expect(files.length).to.equal(2);
      const userRoute = files.filter(file => file.indexOf('user.routes.js') >= 0);
      expect(userRoute).to.have.lengthOf(1);
      const customRoute = files.filter(file => file.indexOf('custom.routes.js') >= 0);
      expect(customRoute).to.have.lengthOf(1);
      done();
    })
  });
});
