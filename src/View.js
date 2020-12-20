const { _$, _$id } = window;

export class View {
  constructor(screens, rootSelector) {
    this.screens = screens;
    this.rootSelector = rootSelector;
  }

  get $root() {
    return _$(this.rootSelector);
  } 

  clearRoot() {
    this.$root.innerHTML = '';
  }

  unmountScreens() {
    this.screens.forEach(screen => screen.unmount());
  }

  getRootContent() {
    return this.$root.innerHTML;
  }

  runRender(path, payload) {
    const [screenName, renderFn] = path.split('/');

    let r = this.screens
      .find(screen => screen.name === screenName);

    r[renderFn](payload);
  }

  setView(screenName) {
    this.unmountScreens();

    let rootContent = this.getRootContent();
    if (rootContent) {
      this.clearRoot();
    }

    this.screens
      .find(screen => screen.name === screenName)
      .mount();
  }

  showLoader() {
    const $loaderDom = _$id('tmp.MainLoader').content.cloneNode(true);
    this.$root.appendChild($loaderDom);
  }
}