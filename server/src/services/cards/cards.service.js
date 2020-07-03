// Initializes the `cards` service on path `/cards`
import createModel from '../../models/cards.model';
import { Cards } from './cards.class';
import hooks from './cards.hooks';

export default function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/cards', new Cards(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cards');

  service.hooks(hooks);
}
