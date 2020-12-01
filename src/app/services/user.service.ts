import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { Investment } from '../models/investment';
import {  } from '../common/app-error';
import { User } from '../models/user';

@Injectable()
export class UserService {
  private baseUrl = 'https://api-card-invest-gor.herokuapp.com';
  private urlRegister = '/auth/register';
  private urlAuthenticate = '/auth/authenticate';
  private user: User;

  constructor(private http: Http) {  }

  registerUser(user) {
    return this.http
      .post(`${this.baseUrl}${this.urlRegister}`, user)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  authenticateUser(user) {
    return this.http
      .post(`${this.baseUrl}${this.urlAuthenticate}`, user)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(errorResponse) {
    return Observable.throw(errorResponse);
  }
}
