import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthenticationService } from '@app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'movies-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  authenticationForm: FormGroup;

  showPwd: boolean = false;

  authError: string = "";

  loggingIn: boolean = false;

  private _destroy$: Subject<any> = new Subject<any>();

  get usernameControl() {
    return this.authenticationForm.get('username');
  }

  get pwdControl() {
    return this.authenticationForm.get('pwd');
  }

  constructor( 
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.authenticationForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      pwd: new FormControl('', [Validators.required])
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  login(): void {
    this.loggingIn = true;
    if(this.authenticationForm.valid) {
      this._authenticationService.login(this.authenticationForm.value.username, this.authenticationForm.value.pwd)
        .pipe(
          takeUntil(this._destroy$)
        )
        .subscribe(res => {
          this.loggingIn = false;
          this._router.navigateByUrl('/movies');
        }, ({error}) => {
          this.loggingIn = false;
          this.authError = error.error.message;
        })
    }
  }
}
