// Initializes the `activities` service on path `/activities`
import createModel from '../../models/activities.model';
import { Activities } from './activities.class';
import hooks from './activities.hooks';

export default function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/activities', new Activities(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('activities');

  service.hooks(hooks);
}
