const app = require('../../src/app');

describe('\'posts\' service', () => {
  it('registered the service', () => {
    const service = app.service('posts');
    expect(service).toBeTruthy();
  });
});
