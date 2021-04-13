import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  storeInLocalStorage(key: string, val: any):void {
    localStorage.setItem(key, val);
  }

  getFromLocalStorage(key: string): any {
    return localStorage.getItem(key);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
  
}