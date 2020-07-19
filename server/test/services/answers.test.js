const app = require('../../src/app');

describe('\'answers\' service', () => {
  it('registered the service', () => {
    const service = app.service('answers');
    expect(service).toBeTruthy();
  });
});
