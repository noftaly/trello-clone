import { hooks } from '@feathersjs/authentication';
import { setField } from 'feathers-authentication-hooks';

const { authenticate } = hooks;

const setUserId = setField({
  from: 'params.user._id',
  as: 'data.ownerId',
});
const limitToOwner = setField({
  from: 'params.user._id',
  as: 'params.query.ownerId',
});

export default {
  before: {
    all: [authenticate('jwt')],
    find: [limitToOwner],
    get: [limitToOwner],
    create: [setUserId],
    update: [limitToOwner],
    patch: [limitToOwner],
    remove: [limitToOwner],
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
