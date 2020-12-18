const { localStorage, JSON } = window;

export class Storage {
  constructor(storageName, initialData) {
    this.storageName = storageName;
  }

  load() {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(localStorage.getItem(this.storageName)));
    });
  }

  async send(data) {
    return new Promise((resolve, reject) => {
      const oldData = localStorage.getItem(this.storageName);
      localStorage.setItem(this.storageName, JSON.stringify({ ...oldData, ...data }));
      resolve();
    });
  }
}