import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { clientID } from '../config/constants';

declare const FB: any;

export interface User {
  img?: string;
  email?: string;
}

@Injectable()
export class UserService {

  readonly URL = 'https://localhost:3000';
  private currentUser: User;

  constructor(private http: HttpClient) {
    this.currentUser = null;
    FB.init({
      appId: clientID,
      status: false,
      cookie: false,
      xfbml: false,
      version: 'v2.8'
    });
  }

  facebookLogin(): Promise<void> {
    return FB.login((loginResponse) => {
      if (loginResponse.authResponse) {
        return this.login(loginResponse.authResponse);
      } else {
        return Promise.resolve(null);
      }
    }, {scope: 'public_profile, email'});
  }

  login(authResponse): Promise<void> {
    return this.http.post(this.URL + '/auth/facebook', {access_token: authResponse.accessToken}, {observe: 'response'})
      .toPromise()
      .then((response: HttpResponse<Object>) => {
        const token = response.headers.get('x-auth-token');
        if (token) {
          localStorage.setItem('id_token', token);
        }
      });
  }

  getUser(response: Response): Promise<User> {
    console.log('Getting user: ', response);
    return null;
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  isLoggedIn(): Promise<boolean> {
    return this.getCurrentUser().then((user) => !!user);
  }

  getCurrentUser(): Promise<User> {
    if (this.currentUser) {
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
        'Current'
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
