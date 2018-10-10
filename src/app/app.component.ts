import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import { ErrorService } from './errors';
import {User} from './user';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { Router, ActivatedRoute } from '@angular/router';

declare function ga(a, b, c): void;


@Component({
    selector: 'cafe-app',
    templateUrl: './app.html',
    styleUrls: ['./app.css'],
})


export class AppComponent implements OnInit {
  public user: User;
  private register: boolean = false;
  private email: string;
  private email2: string;

  constructor(private _userService: UserService,
              private _router: Router,
              private _errorService: ErrorService,
              private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics){ }

  setUser(user: User){
    if(user == undefined){
      this.angulartics2GoogleAnalytics.setUsername(undefined);
      this.register = true;
      this.user = user;
    } else {
      this.angulartics2GoogleAnalytics.setUsername(user.username);
      ga('set', 'userId', user.username);
      this.register = false;
      this.user = user;
      this._router.navigate(['questionnaire', this.user.active_organization.org_type]);
    }
  }

  retrieveUser(){
    this._userService.retrieveUser(this.email2).subscribe(
      _ => this._errorService.announceError('Email Sent',
                                            'Please check your inbox',
                                            0),
      error => this._errorService.announceError('Email Error',
                                                error['error'],
                                                3)
    );
  }

  startQuestionnaire(questionnaire_type: string){
    this._userService.createUser(questionnaire_type, this.email).subscribe(
      user => user.subscribe(
        user => this.setUser(user)),
      error => console.log(error)
    );
  }

  ngOnInit(){
    let url = new URL(window.location.href);
    if(url.href.search("/login") > 0 && url.searchParams.has('token')){
      let login_token = url.searchParams.get('token');
      this._userService.tokenLogin(login_token).subscribe(
        res => res.subscribe(
          user => this.setUser(user)),
        error => {
          this.register = true;
          this._errorService.announceError('Login Error',
                                           error['error'],
                                           3);
        });
    } else {
      this._userService.getUser().subscribe(
        user => this.setUser(user),
        error => this.register = true
      );
    }
    this._userService.userChanged.subscribe(
      user => this.setUser(user)
    );
  }
}
