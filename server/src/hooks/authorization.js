import { Forbidden } from '@feathersjs/errors';
import mongoose from 'mongoose';

export default async function limitToBoardOwner(context) {
  const boards = mongoose.model('boards');
  const board = await boards.findById(context.params.query.boardId || context.data.boardId);

  if (board) {
    if (board.ownerId.toString() === context.params.user._id.toString())
      return context;
    throw new Forbidden("You don't have the permission to see this.");
  }
  return context;
}
