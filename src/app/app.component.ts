import { Component } from '@angular/core';

import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'freemovies';

  constructor(private _authService: AuthenticationService) {}

  logout() {
    this._authService.logout();
  }

  isAuthenticated(): boolean {
    return this._authService.isAuthenticated()
  }
}
