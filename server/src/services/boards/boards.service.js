// Initializes the `boards` service on path `/boards`
import createModel from '../../models/boards.model';
import { Boards } from './boards.class';
import hooks from './boards.hooks';

export default function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/boards', new Boards(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('boards');

  service.hooks(hooks);
}
