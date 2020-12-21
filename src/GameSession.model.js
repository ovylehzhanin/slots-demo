import { makeSpin } from './services.js';
import { Storage } from './Storage.js';
const { CONSTANTS }= window.APP_GLOBALS;

export class GameSessionModel {
  constructor() {
    this.gameSessionStorage = new Storage(CONSTANTS.GAME_SESSION_KEY);
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