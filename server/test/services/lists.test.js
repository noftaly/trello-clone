import assert from 'assert';
import app from '../../src/app';

describe('\'lists\' service', () => {
  it('registered the service', () => {
    const service = app.service('lists');

    assert.ok(service, 'Registered the service');
  });
});
