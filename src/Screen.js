const { _$, _$id } = window;

export class Screen {
  constructor(rootSelector, name) {
    this.rootSelector = rootSelector;
    this.name = name;
    this.templateSelector = `tmp.${this.name}`;
  }

  get $dom() {
    return this.$root.querySelector(`#${this.name}`);
  }

  get $template() {
    return _$id(`${this.templateSelector}`).content.cloneNode(true);
  }

  get $root() {
    return _$(this.rootSelector);
  }

  mount() {
    this.$root.appendChild(this.$template);
  }

  unmount() {
    const $root = this.$root;
    /* TODO: pretify _$ usage with 2-nd arg @{scope} as optional param */
    let domInstance = $root.querySelector(`#${this.name}`);

    domInstance && $root.removeChild(domInstance);
  }
}