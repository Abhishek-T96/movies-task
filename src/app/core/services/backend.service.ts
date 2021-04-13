import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private _http: HttpClient) {}

  get$(url: string, options?: any): Observable<any> {
    return this._http.get<any>(url, options).pipe(
      take(1),
      catchError(err => {
        throw this._handleError(err);
      })
    );
  }

  post$(url: string, body?: any, options?: any): Observable<any> {
    return this._http.post(url, body, options).pipe(
      take(1),
      catchError(err => {
        throw this._handleError(err);
      })
    );;
  }

  private _handleError(err): void {
    console.log(err);
    return err;
  }

}