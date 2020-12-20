const { localStorage, JSON } = window;

export class Storage {
  constructor(storageName) {
    this.storageName = storageName;
  }

  applyMock(data) {
    this.setSync(data);
  }

  setSync(data) {
    localStorage.setItem(this.storageName, JSON.stringify(data));
  }

  async load() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loadSync())
      }, 300);
    });
  }

  loadSync() {
    return JSON.parse(localStorage.getItem(this.storageName));
  }

  async send(data) {
    return new Promise((resolve, reject) => {
      localStorage.setItem(this.storageName, JSON.stringify(data));
      resolve();
    });
  }
}