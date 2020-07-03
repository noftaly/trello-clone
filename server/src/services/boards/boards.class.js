import { Service } from 'feathers-mongoose';

export class Boards extends Service {
  async get(id, params) {
    return { id, params };
  }
}
