import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {BackendService } from '@app/services/backend.service';
import { StorageService } from '@app/services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor( private _backendService: BackendService, private _localStorageService: StorageService) {}

  getMoviesList(url: string): Observable<any> {
    const authHeader = new HttpHeaders({
      'Authorization': `Token ${this._localStorageService.getFromLocalStorage('token')}`
    })
    return this._backendService.get$(url, { 'headers': authHeader});
  }
}