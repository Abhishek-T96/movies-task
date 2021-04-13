import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { AuthenticationService } from '@app/services/authentication.service';
import { filter, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'freemovies';
  loginPage: boolean = false;

  constructor(
    private _authService: AuthenticationService, 
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._router.events
    .pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      startWith(this._router)
    )
    .subscribe((event: NavigationEnd | Router) => {
      if(event.url === '/login')
        this.loginPage = true;
      else
        this.loginPage = false;
    })
  }

  logout() {
    this._authService.logout();
  }

  isAuthenticated(): boolean {
    return this._authService.isAuthenticated()
  }
}
