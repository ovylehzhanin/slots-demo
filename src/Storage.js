const { localStorage, JSON } = window;

export class Storage {
  constructor(storageName) {
    this.storageName = storageName;
  }

  load() {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(localStorage.getItem(this.storageName)));
    });
  }

  send(data) {
    return new Promise((resolve, reject) => {
      localStorage.setItem(this.storageName, JSON.stringify(data));
      resolve();
    });
  }
}