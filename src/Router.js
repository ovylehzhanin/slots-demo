const { CONSTANTS } = window.APP_GLOBALS;

export class Router {
  constructor(routes = {}) {
    this.history = window.history;
    this.routes = routes;
  }

  cleanHash() {
    this.history.replaceState(null, null, ' ');
  }

  pushToRoute(routeName) {
    const { path } = this.routes[routeName];

    if (path === CONSTANTS.EMPTY_ROUTE) {
      this.cleanHash();
    } else {
      this.history.pushState(null, null, path);
    }
  }
}