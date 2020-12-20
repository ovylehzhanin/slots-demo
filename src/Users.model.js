import { Storage } from './Storage.js';
import { getUserInfo } from './services.js';
const { CONSTANTS } = window.APP_GLOBALS;

export class UsersModel {
  constructor() {
    this.usersStorage = new Storage(CONSTANTS.USERS_STORAGE_KEY);
  }

  applyMock(mockedData) {
    this.usersStorage.applyMock(mockedData);
  }

  async getUsersList() {
    let res = await this.usersStorage.load();
    return res;
  }

  async addUser(userData) {
    const existingUsers = this.usersStorage.loadSync();
    const userExist = existingUsers.find(existingUser => existingUser.id === userData.id);
    if (!userExist) {
      console.error('User already exist');
      return null;
    }
    await this.usersStorage.send([...existingUsers, userData]);
  }

  async getUserDetails(userId) {
    return await getUserInfo(userId);
  }
}