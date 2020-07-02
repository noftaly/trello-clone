import boards from './boards/boards.service';
import lists from './lists/lists.service';
import users from './users/users.service';

export default function (app) {
  app.configure(users);
  app.configure(boards);
  app.configure(lists);
}
