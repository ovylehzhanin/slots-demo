import { Router } from './Router.js';
import { View } from './View.js';
import { GameScreen } from './GameScreen.js';
import { LoginScreen } from './LoginScreen.js';
import { UsersModel } from './Users.model.js';

/* for dev needs */
import { TestScreen } from './TestScreen.js';
/* end */

import { GameSessionModel } from './GameSession.model.js';
const { APP_GLOBALS: { ROUTES, IS_DEVELOPMENT } } = window;

const view = new View([
  new LoginScreen('#gameRoot', 'LoginScreen'),
  new GameScreen('#gameRoot', 'GameScreen'),
  new TestScreen('#gameRoot', 'TestScreen')
], '#gameRoot');

if (IS_DEVELOPMENT) {
  window._view = view;
}

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

  view.$root._on('request-login', ({ detail }) => {
    gameSessionModel.write(detail.userId);
    router.pushToRoute('HOME');
  });

  view.$root._on('game-screen-ready', async () => {
    const userId = gameSessionModel.getLastSession();
    if (userId?.length) {
      view.showLoader();
      const userDetails = await usersModel.getUserDetails(userId)
      view.runRender('GameScreen/updateDetails', userDetails);
      view.hideLoader();
    }
  });

  view.$root._on('spin-pressed', async ({ detail }) => {
    view.showLoader();
    const result = await gameSessionModel.placeBet(gameSessionModel.getLastSession(), detail.value);
    view.runRender('GameScreen/updateDetails', result);
    view.hideLoader();
  });

  view.$root._on('login-screen-ready', async () => {
    view.showLoader();
    let usersList = await usersModel.getUsersList();
    if (!usersList?.length) {
      let mockedUsers = await (await fetch('assets/mock/users.json')).json();
      usersModel.applyMock(mockedUsers);
      usersList = await usersModel.getUsersList();
    }
    router.pushToRoute('LOGIN');
    view.runRender('LoginScreen/renderUsers', usersList);
    view.hideLoader();
  });

  view.$root._on('logout-pressed', async () => {
    gameSessionModel.deleteSession();
    router.pushToRoute('LOGIN');
  });
  let gameSession = gameSessionModel.getLastSession();

  /* TODO: use constants(!) */
  router.pushToRoute(gameSession ? 'HOME' : 'LOGIN');
}