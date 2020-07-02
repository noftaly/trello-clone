import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import SignUp from '../views/SignUp';
import Login from '../views/Login';
import Boards from '../views/Boards';
import Board from '../views/Board';

import store from '../store';

Vue.use(VueRouter);

function isLoggedIn(_to, _from, next) {
  // Before going to '/', try to authenticate automatically
  store.dispatch('auth/authenticate')
    .then(() => next())
    .catch(() => next('/login'));
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(_to, _from, next) {
      // Before going to '/', try to authenticate automatically
      store.dispatch('auth/authenticate')
        .then(() => next('/boards'))
        .catch(() => next('/login'));
    },
  }, {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  }, {
    path: '/login',
    name: 'login',
    component: Login,
  }, {
    path: '/boards',
    name: 'boards',
    component: Boards,
    beforeEnter: isLoggedIn,
  }, {
    path: '/boards/:id',
    name: 'board',
    component: Board,
    beforeEnter: isLoggedIn,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
