import { Screen } from './Screen.js';
const { _$ } = window;

export class GameScreen extends Screen {
  constructor(rootSelector, templateSelector) {
    super(rootSelector, templateSelector);
    this.betActions = {
      decrease:  'decrease',
      increase: 'increase'
    };
    this.betValues = [];
  }

  get $spinButton() {
    return _$('#spinButton');
  }

  get $betControls() {
    return _$$('.bet-selector__controls-bar .bet-selector__control');
  }

  get $betInput() {
    return _$('#betInput');
  }

  get $balanceInput() {
    return _$('#balanceInput');
  }

  get $logoutButton() {
    return _$('#logoutButton');
  }

  initDetailsFetch() {
    this.$root.dispatchEvent(new CustomEvent('game-screen-ready'));
  }

  updateDetails({ balance, last_bet, rolls, bets }) {
    this.$betInput.value = last_bet;
    this.$balanceInput.value = balance;
    this.betValues = bets.slice(0);
  }

  updateBet(value) {
    if (value) {
      this.$betInput.value = value;
    }
  }

  bindEvents() {
    this.$spinButton._on('click', (event) => {
      const value = this.$betInput.value;
      if (value) {
        this.$root.dispatchEvent(new CustomEvent('spin-pressed', { detail: { value } }));
      }
    });

    this.$logoutButton._on('click', (event) => {
      this.$root.dispatchEvent(new CustomEvent('logout-pressed'));
    });

    this.$betControls._on('click', (event) => {
      const action = event?.target?.value;
      const currentBet = this.$betInput.value;
      this.$root.dispatchEvent(new CustomEvent('change-bet', {
        detail: {
          action,
          currentBet
        }
      }));
    });
  }

  mount() {
    super.mount();
    this.bindEvents();
    this.initDetailsFetch();
  }
}