import { Injectable } from '@angular/core';

@Injectable()
export class StorageServ {
  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      return JSON.parse(this.storage.getItem(key));
    }

    return null;
  }

  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.storage.setItem(key, JSON.stringify(value));

      return true;
    }

    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.storage.removeItem(key);

      return true;
    }

    return false;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.storage;
  }
}
