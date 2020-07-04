import { hooks } from '@feathersjs/authentication';
import { setField } from 'feathers-authentication-hooks';
import moment from 'moment';
import limitToBoardOwner from '../../hooks/authorization';

const { authenticate } = hooks;
async function populateActivities(context) {
  const { data } = context.result;
  const userIds = [...new Set(data.map(activity => activity.userId.toString()))];
  const users = await context.app.service('users').find({
    paginate: false,
    query: {
      _id: { $in: userIds },
    },
  });
  const usersById = users.reduce((byId, user) => {
    byId[user._id] = user;
    return byId;
  }, {});
  // eslint-disable-next-line guard-for-in
  for (const activity of data) {
    activity.user = usersById[activity.userId];
    activity.formattedDate = moment(activity.createdAt).fromNow();
  }
  return context;
}
async function populateActivity(context) {
  const user = await context.app.service('users').get(context.result.userId);
  context.result.user = user;
  context.result.formattedDate = moment(context.result.createdAt).fromNow();
  return context;
}

export default {
  before: {
    all: [authenticate('jwt'), limitToBoardOwner],
    find: [],
    get: [],
    create: [setField({
      from: 'params.user._id',
      as: 'data.userId',
    })],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [populateActivities],
    get: [],
    create: [populateActivity],
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
