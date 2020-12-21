import { Screen } from './Screen.js';
const { _$ } = window;

export class GameScreen extends Screen {
  constructor(rootSelector, templateSelector) {
    super(rootSelector, templateSelector);
  }

  get $spinButton() {
    return this.$root.querySelector('#spinButton');
  }

  get $betInput() {
    return this.$root.querySelector('#betInput');
  }

  get $balanceInput() {
    return this.$root.querySelector('#balanceInput');
  }

  get $logoutButton() {
    return this.$root.querySelector('#logoutButton');
  }

  initDetailsFetch() {
    this.$root.dispatchEvent(new CustomEvent('game-screen-ready'));
  }

  updateDetails({ balance, last_bet, rolls }) {
    this.$betInput.value = last_bet;
    this.$balanceInput.value = balance;
  }

  bindEvents() {
    this.$spinButton._on('click', (event) => {
      const value = this.$betInput.value;
      this.$root.dispatchEvent(new CustomEvent('spin-pressed', { detail: { value }}));
    });

    this.$logoutButton._on('click', (event) => {
      this.$root.dispatchEvent(new CustomEvent('logout-pressed'));
    });
  }

  mount() {
    super.mount();
    this.bindEvents();
    this.initDetailsFetch();
  }
}