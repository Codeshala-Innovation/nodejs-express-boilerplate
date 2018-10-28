import { expect } from 'chai';
import { normalizePort } from '../../src/utils';

describe('Normalize port', () => {
  it('should returns port if port is valid number', () => {
    const port = 4000;
    expect(normalizePort(port)).to.equal(4000);
  });

  it('should returns port if port is valid string', () => {
    const port = '4000';
    expect(normalizePort(port)).to.equal(4000);
  });

  it('should returns default port if port is invalid string', () => {
    const port = 'aasb';
    expect(normalizePort(port)).to.equal(3000);
  });
});
