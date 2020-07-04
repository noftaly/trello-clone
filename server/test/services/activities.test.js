import assert from 'assert';
import app from '../../src/app';

describe('\'activities\' service', () => {
  it('registered the service', () => {
    const service = app.service('activities');

    assert.ok(service, 'Registered the service');
  });
});
