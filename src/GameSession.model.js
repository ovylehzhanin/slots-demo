import { Storage } from './Storage.js';
const { CONSTANTS }= window.APP_GLOBALS;

export class GameSessionModel {
  constructor() {
    this.gameSessionStorage = new Storage(CONSTANTS.GAME_SESSION_KEY);
  }

  getLastSession() {
    return this.gameSessionStorage.loadSync();
  }

  write() {
    this.gameSessionStorage.setSync('hello');
  }
}