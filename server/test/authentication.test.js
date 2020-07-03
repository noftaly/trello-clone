import assert from 'assert';
import app from '../src/app';

describe('authentication', () => {
  it('registered the authentication service', () => {
    assert.ok(app.service('authentication'));
  });

  describe('local strategy', () => {
    const userInfo = {
      username: 'acoolusername',
      password: 'asecretpassword',
      displayName: 'coolname',
      imageUrl: 'https://avatars3.githubusercontent.com/u/34779161?s=460&u=6bbbc0fac0f5ac6a1ed5146351e99a3756e8e74c&v=4',
    };

    before(async () => {
      try {
        await app.service('users').create(userInfo);
      } catch {
        // Do nothing, it just means the user already exists and can be tested
      }
    });

    it('authenticates user and creates accessToken', async () => {
      const { user, accessToken } = await app.service('authentication').create({
        strategy: 'local',
        ...userInfo,
      });

      assert.ok(accessToken, 'Created access token for user');
      assert.ok(user, 'Includes user in authentication data');
    });
  });
});
