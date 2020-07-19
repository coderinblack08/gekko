const app = require('../../src/app');

describe('\'forums\' service', () => {
  it('registered the service', () => {
    const service = app.service('forums');
    expect(service).toBeTruthy();
  });
});
