import { Router } from './Router.js';
import { View } from './View.js';
import { GameScreen } from './GameScreen.js';
import { LoginScreen } from './LoginScreen.js';
import { UsersModel } from './Users.model.js';

/* for dev needs */
import { TestScreen } from './TestScreen.js';
/* end */

import { GameSessionModel } from './GameSession.model.js';
const { APP_GLOBALS: { ROUTES } } = window;

const view = new View([
  new LoginScreen('#gameRoot', 'LoginScreen'),
  new GameScreen('#gameRoot', 'GameScreen'),
  new TestScreen('#gameRoot', 'TestScreen')
], '#gameRoot');

const router = new Router(ROUTES);
const usersModel = new UsersModel();
const gameSessionModel = new GameSessionModel();

const handleRoute = (_) => {
  view.unmountScreens();
  view.setView(router.getRequestedScreenName());
};

export function initialize() {
  view.showLoader();
  window._on('hashchange', handleRoute);
  window._on('load', handleRoute);
}

export async function main() {
  // gameSessionModel.write();
  let usersList = await usersModel.getUsersList();
  let gameSession = gameSessionModel.getLastSession();

  if (gameSession) {
    router.pushToRoute('HOME');
  } else {
    if (!usersList?.length) {
      let mockedUsers = await (await fetch('assets/mock/users.json')).json();
      usersModel.applyMock(mockedUsers);
      usersList = await usersModel.getUsersList();
    }
    router.pushToRoute('LOGIN');
    view.runRender('LoginScreen/renderUsers', usersList);
  }
};
