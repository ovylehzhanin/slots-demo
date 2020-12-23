import { Screen } from './Screen.js';
import { formatMarkup } from './utils.js';
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

  get $slotsInnerScreen() {
    return _$('.slots__inner');
  }

  get $wheelTemplate() {
    return _$id('tmp.WheelTemplate').content.cloneNode(true);
  }

  get $cellTemplate() {
    return _$id('tmp.CellTemplate').content.cloneNode(true);
  }

  $getWheels(rolls) {
    const arrayIsNotEmpty = Array.isArray(rolls) && rolls.length > 0;
    let result = null;

    if (arrayIsNotEmpty) {
      result = rolls.map(roll => {
        let $cells = this.formatCells(roll);
        let $wheel = this.$wheelTemplate.firstElementChild;
        $wheel.append(...$cells);
        return $wheel;
      });
    }

    return result;
  }

  formatCells(roll) {
    return roll.map(cellValue => {
      return formatMarkup(this.$cellTemplate.firstElementChild, cellValue);
    });
  }

  initDetailsFetch() {
    this.$root.dispatchEvent(new CustomEvent('game-screen-ready'));
  }

  updateWheels(rolls) {
    const $wheels = this.$getWheels(rolls);
    this.clearSlotsScreen();
    this.$slotsInnerScreen.append(...$wheels);
  }

  updateDetails({ balance, last_bet, rolls, bets }) {
    this.$betInput.value = last_bet;
    this.$balanceInput.value = balance;
    this.betValues = bets.slice(0);
    this.updateWheels(rolls);
  }

  updateBet(value) {
    if (value) {
      this.$betInput.value = value;
    }
  }

  clearSlotsScreen() {
    this.$slotsInnerScreen.innerHTML = '';
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