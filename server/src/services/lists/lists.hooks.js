import { hooks } from '@feathersjs/authentication';
import limitToBoardOwner from '../../hooks/authorization';

const { authenticate } = hooks;

export default {
  before: {
    all: [authenticate('jwt'), limitToBoardOwner],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
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
