import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { clientID } from '../../../../config/constants';
import { Subject } from "rxjs";

declare const FB: any;

export interface User {
  firstName?: string;
  lastName?: string;
  img?: string;
  email?: string;
}

@Injectable()
export class UserService {

  public loginFinished: Subject<boolean>;
  readonly URL = 'https://localhost:3000';
  public currentUser: User;

  constructor(private http: HttpClient) {
    this.currentUser = null;
    FB.init({
      appId: clientID,
      status: false,
      cookie: false,
      xfbml: false,
      version: 'v2.8'
    });

    this.loginFinished = new Subject();
  }

  async facebookLogin(): Promise<void> {
    return FB.login((loginResponse) => {
      if (loginResponse.authResponse) {
        return this.login(loginResponse.authResponse);
      }
    }, {scope: 'public_profile, email'});
  }

  login(authResponse): Promise<void> {
    return this.http.post(this.URL + '/auth/facebook', {access_token: authResponse.accessToken}, {observe: 'response'})
      .toPromise()
      .then(async(response: HttpResponse<Object>) => {
        const token = response.headers.get('x-auth-token');
        if (token) {
          localStorage.setItem('id_token', token);
        }
        await this.getCurrentUser();
        this.loginFinished.next(true);
      });
  }

  getUser(response: Response): Promise<User> {
    console.log('Getting user: ', response);
    return null;
  }

  getAuthHeaders(): Object  {
    let header = {'x-auth-token': localStorage.getItem('id_token')};
    return header;
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  isLoggedIn(): Promise<boolean> {
    return this.getCurrentUser().then((user) => !!user);
  }

  getCurrentUser(): Promise<User> {
    if (this.currentUser) {
      console.log('Already had current user: ', this.currentUser);
      return Promise.resolve(this.currentUser);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token':  localStorage.getItem('id_token'),
      })
    };
    console.log('Get current user: ', httpOptions);

    return this.http.get(this.URL + '/auth/me', httpOptions)
      .toPromise().then((response: Response) => {
        'Current';
        this.currentUser = new User(response['email'], response['firstName'], response['lastName']);
        return this.currentUser;
    }).catch(() => {
        // todo reset views (log user out, go to homepage, show error message)
        this.currentUser = null;
        console.log('Error happened. Resetting views.');
        return Promise.resolve(null);
    });
  }
}
