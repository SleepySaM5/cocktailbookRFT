import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';
import { backendURL } from '../../../../config/constants';
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  favourites: Cocktail[] = [];
  favouritesSubject: Subject<Cocktail[]>;

  constructor(private http: HttpClient) {
    this.favouritesSubject = new Subject();
  }

  addToFavourites(cocktail: Cocktail): Observable<boolean> {
    console.log('Adding ', cocktail.name, ' to favourites!');

    if (!localStorage.getItem('id_token')) {
      return of(false);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': localStorage.getItem('id_token')
      })
    };

    return this.http.post<any>(backendURL + `/favourites/${cocktail.id}`, null, httpOptions)
      .pipe(catchError((err) => {
          console.log('Error happened: ', err);
          return of(false);
        }),
        tap(() => {
          this.favourites = this.favourites.concat(cocktail);
          this.favouritesSubject.next(this.favourites);

        }))
  }

  removeFromFavourites(cocktail: Cocktail): Observable<boolean> {
    console.log('Removing: ', cocktail.name, ' from favourites!');

    if (!localStorage.getItem('id_token')) {
      return of(false);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': localStorage.getItem('id_token')
      })
    };

    return this.http.delete<any>(backendURL + `/favourites/${cocktail.id}`, httpOptions)
      .pipe(catchError((err) => {
          console.log('Error happened: ', err);
          return of(false);
        }),
        tap(() => {
          if (this.favourites.includes(cocktail)) {
            this.favourites = this.favourites.filter((favourite) => favourite.id === cocktail.id);
            this.favouritesSubject.next(this.favourites);
          }
        }))
  }

  isFavorite(cocktail: Cocktail): Promise<boolean> {
    return this.getAllFavourites().toPromise()
      .then((favourites: Cocktail[]) => favourites.includes(cocktail));
  }

  getAllFavourites(): Observable<Cocktail[]> {
    if(!localStorage.getItem('id_token')) {
      return of([]);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': localStorage.getItem('id_token')
      })
    };
    console.log('The options are: ', httpOptions.headers.get('x-auth-token'));

    return this.http.get<Cocktail[]>(backendURL + '/favourites', httpOptions)
      .pipe(map((favourites: any[]) => {
        this.favourites = favourites.map((cocktail: any) => new Cocktail(
          cocktail.cocktailName,
          cocktail.ingredientList,
          cocktail.description,
          cocktail.imgPath,
          cocktail.imgAlt,
          cocktail._id));
        return this.favourites;
      }));
  }
}
