const { CONSTANTS } = window.APP_GLOBALS;

export class Router {
  constructor(routes = []) {
    this.history = window.history;
    this.location = window.location;
    this.routes = routes;
  }

  cleanHash() {
    this.location.hash = '';
  }

  pushToRoute(routeName) {
    const { path } = this.routes.find((route) => route.routeName === routeName);

    if (path === CONSTANTS.EMPTY_ROUTE) {
      this.cleanHash();
    } else {
      this.location.hash = `${path}`;
    }
  }

  findRequestedRoute(locationHash) {
    return this.routes.find(({ path }) => path === locationHash);
  }

  getRequestedScreenName() {
    let { screenName } = this.findRequestedRoute(this.location.hash);
    return screenName;
  }

}