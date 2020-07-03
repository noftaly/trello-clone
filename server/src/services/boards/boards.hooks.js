import { hooks } from '@feathersjs/authentication';
import { setField } from 'feathers-authentication-hooks';

const { authenticate } = hooks;

const setUserId = setField({
  from: 'params.user._id',
  as: 'data.ownerId',
});
const limitToUser = setField({
  from: 'params.user._id',
  as: 'params.query.ownerId',
});

export default {
  before: {
    all: [authenticate('jwt')],
    find: [limitToUser],
    get: [limitToUser],
    create: [setUserId],
    update: [limitToUser],
    patch: [limitToUser],
    remove: [limitToUser],
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
