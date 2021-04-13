import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { AuthenticationService } from '@app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {
  
  constructor( private _authService: AuthenticationService, private _router: Router ) {}

  canActivate() {
    return this._handleAuth();
  }

  canLoad() {
    return this._handleAuth();
  }

  private _handleAuth() {
    if(!this._authService.isAuthenticated()) {
      this._router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}