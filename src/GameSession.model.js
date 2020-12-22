import { makeSpin } from './services.js';
import { Storage } from './Storage.js';
const { CONSTANTS }= window.APP_GLOBALS;

export class GameSessionModel {
  constructor() {
    this.gameSessionStorage = new Storage(CONSTANTS.GAME_SESSION_KEY);
    this.betsStorage = new Storage(CONSTANTS.BET_AMOUNTS_KEY);
  }

  set bets(value) {
    if (Array.isArray(value)) {
      this.betsStorage.setSync(value);
    }
  }

  get bets() {
    return this.betsStorage.loadSync();
  }

  getNextBet(action, currentBet) {
    const bets = [...this.bets];
    if (typeof currentBet === 'string') {
      currentBet = Number(currentBet);
    }
    const currentIndex = bets.indexOf(currentBet);
    let index = currentIndex;

    if (action === CONSTANTS.ACTION_DECREASE) {
      index -= 1;
    }

    if (action === CONSTANTS.ACTION_INCREASE) {
      index += 1;
    }

    let result = bets[index];

    if (result === undefined) return;

    return result;
  }

  getLastSession() {
    return this.gameSessionStorage.loadSync();
  }

  write(userId) {
    this.gameSessionStorage.setSync(userId);
  }

  deleteSession() {
    this.gameSessionStorage.clear();
  }

  async placeBet(userId, bet) {
    return await makeSpin(userId, bet);
  }
}