import { hooks } from '@feathersjs/authentication';
import { Forbidden } from '@feathersjs/errors';
import mongoose from 'mongoose';

const { authenticate } = hooks;

async function limitToBoardOwner(context) {
  const boards = mongoose.model('boards');

  const board = await boards.findById(context.params.query.boardId);

  if (board) {
    if (board.ownerId.toString() === context.params.user._id.toString())
      return context;
    throw new Forbidden("You don't have the permission to see this.");
  }
  return context;
}

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
