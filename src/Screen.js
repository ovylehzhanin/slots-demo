const { _$ } = window;

export class Screen {
  constructor($root, templateSelector) {
    this.$root = $root;
    this.templateSelector = templateSelector;
    this.$dom = null;
  }

  getTemplateNode() {
    return _$(`#tmp.${this.templateSelector}`);
  }

  mount() { }

  unmount() { }
}