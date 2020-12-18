import { Storage } from './Storage.js';
import { USERS_STORAGE_KEY } from './constants.js';
import { getUserInfo } from './services.js';

export class UsersModel {
  constructor() {
    this.storage = new Storage(USERS_STORAGE_KEY);
  }

  async getUsersList() {
    return await this.storage.load();
  }

  async addUser(userData) {
    await this.storage.send(userData);
  }

  async getUserDetails(userId) {
    return await getUserInfo(userId);
  }
}