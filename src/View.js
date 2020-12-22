const { _$, _$id } = window;

export class View {
  constructor(screens, rootSelector) {
    this.screens = screens;
    this.rootSelector = rootSelector;
  }

  get $root() {
    return _$(this.rootSelector);
  }

  get $loaderTemplate() {
    return _$id('tmp.MainLoader').content.cloneNode(true);
  }

  get $loader() {
    return this.$root.querySelector('.loader');
  }

  unmountScreens() {
    this.screens.forEach(screen => screen.unmount());
  }

  runRender(path, payload) {
    const [screenName, renderFn] = path.split('/');

    let requestedScreen = this.screens
      .find(screen => screen.name === screenName);

    if (!requestedScreen) {
      console.warn(`
        View.js => View.runRender(path: <string>, payload: <object>)
        Seems like you've requested screenName or didn't created instance for screen properly: ${screenName}
      `)
    }

    requestedScreen[renderFn](payload);
  }

  setView(screenName) {
    this.unmountScreens();

    this.screens
      .find(screen => screen.name === screenName)
      .mount();
  }

  showLoader() {
    if (!this.$loader) {
      this.$root.appendChild(this.$loaderTemplate);
    }
  }

  hideLoader() {
    this.$loader && this.$loader.remove();
  }
}