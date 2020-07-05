import { models } from '../../feathers-client';

const actions = {
  login({ dispatch }, { valid, user, router }) {
    if (valid) {
      dispatch('auth/authenticate', { strategy: 'local', ...user }, { root: true })
        .then(() => router.push('/boards'))
        .catch((e) => console.error('Authentication error', e));
    }
  },
  async signUp(_, { valid, user, router }) {
    if (valid) {
      console.log('DEBUG: signUp -> models', models);
      const { User } = models.api;
      const newUser = new User(user);
      await newUser.save();
      router.push('/login');
    }
  },
};

export default {
  namespaced: true,
  actions,
};
