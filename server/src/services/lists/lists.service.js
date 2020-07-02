// Initializes the `lists` service on path `/lists`
import createModel from '../../models/lists.model';
import { Lists } from './lists.class';
import hooks from './lists.hooks';

export default function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/lists', new Lists(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('lists');

  service.hooks(hooks);
}
