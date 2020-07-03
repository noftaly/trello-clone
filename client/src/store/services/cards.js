import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class Card extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Card';

  // Define default properties here
  static instanceDefaults() {
    return {
      title: '',
      content: '',
      order: 0,
      listId: '',
      boardId: '',
      archived: false,
      membersId: [],
    };
  }
}

const servicePath = 'cards';
const servicePlugin = makeServicePlugin({
  Model: Card,
  service: feathersClient.service(servicePath),
  servicePath,
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
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
});

export default servicePlugin;
