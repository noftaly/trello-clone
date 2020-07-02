import { hooks as authHooks } from '@feathersjs/authentication';
import hooks from 'feathers-authentication-hooks';

const { authenticate } = authHooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [hooks.setField({ from: 'params.user._id', as: 'params.query.ownerId' })],
    get: [hooks.setField({ from: 'params.user._id', as: 'params.query.ownerId' })],
    create: [hooks.setField({ from: 'params.user._id', as: 'data.ownerId' })],
    update: [hooks.setField({ from: 'params.user._id', as: 'params.query.ownerId' })],
    patch: [hooks.setField({ from: 'params.user._id', as: 'params.query.ownerId' })],
    remove: [hooks.setField({ from: 'params.user._id', as: 'params.query.ownerId' })],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
