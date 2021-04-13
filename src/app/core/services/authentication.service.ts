import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as moment from 'moment';

import {BackendService } from '@app/services/backend.service';
import { StorageService } from '@app/services/storage.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private _url: string = "https://demo.credy.in/api/v1/usermodule/login/";

  constructor( 
    private _backendService: BackendService,
    private _localStorageService: StorageService,
    private _router: Router
  ) { }

  login(username: string, password: string): Observable<any> {
    return this._backendService.post$(this._url, { username, password, appendToken: false })
      .pipe(
        tap((res) => {
          this._setLocalStorageData(res.data);
        })
      );
  }

  private _setLocalStorageData(data): void {
    const timestamp = moment(data.expiry).valueOf();
    this._localStorageService.storeInLocalStorage('expiry', +timestamp);
    this._localStorageService.storeInLocalStorage('token', data.token);
  }


  isAuthenticated(): boolean {
    const currTimeStamp = +moment().valueOf();
    return this._localStorageService.getFromLocalStorage('token') && ( +this._localStorageService.getFromLocalStorage('expiry') > currTimeStamp)
  }

  logout(): void {
    this._localStorageService.clearLocalStorage();
    this._router.navigateByUrl('/login');
  }

  
}