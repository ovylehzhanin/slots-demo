import { Router } from './Router.js';
import { GameScreen } from './GameScreen.js';
import { LoginScreen } from './LoginScreen.js';
import { UsersModel } from './Users.model.js';
const { _$, APP_GLOBALS: { ROUTES }, location } = window;

export async function main() {
  const userLoggined = false;
  const router = new Router(ROUTES);
  const $rootEl = _$('#gameRoot');
  const screens = [
    new LoginScreen('#gameRoot', 'LoginScreen'),
    new GameScreen('#gameRoot', 'GameScreen')
  ];

  const usersModel = new UsersModel();

  await usersModel.addUser({ name: 'Nick', id: 2002 });
  const res = await usersModel.getUsersList();
  console.log(res);

  // if (!userLoggined) {}
  const routeControls = [_$('#toHome'), _$('#toLogin')];

  routeControls._on('click', (event) => {
    router.pushToRoute(event.target.dataset.route);
  })

  const handleRoute = (event) => {
    screens.forEach(screen => screen.unmount());

    let requestedRoute = ROUTES.find(({ path }) => path === location.hash);

    screens
      .find(screen => screen.name === requestedRoute.screenName)
      .mount();
  };

  window._on('hashchange', handleRoute);
  window._on('load', handleRoute);
};
