import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Cocktail } from '../models/cocktail.model';
import { Ingredient } from '../models/ingredient.model';
import { Comment } from '../models/comment.model';

import { catchError, map } from 'rxjs/operators';
import { concat, uniq } from 'lodash';

@Injectable()
export class CocktailService {

  cocktails: Cocktail[] = [];
  ingredients: Ingredient[] = [];
  readonly URL = 'https://localhost:3000';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  getAllCocktails(): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(this.URL + '/cocktail');
  }

  getAllIngredients(): Observable<Ingredient[]> {

    return this.getAllCocktails().pipe(
      map((cocktails) => {
        cocktails.forEach((cocktail) => {
          this.ingredients = uniq(concat(cocktail.ingredientList, this.ingredients));
        });
        return this.ingredients;
      })
    );
  }

  search(ingredients: string[]): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(this.URL + '/cocktail/filter?ingredients=' + ingredients);
  }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.URL + '/comments');
  }

  addCocktail (cocktail: Cocktail): Observable<Cocktail> {
    return this.http.post<Cocktail>(this.URL + '/cocktail', cocktail)
      .pipe(
        catchError(this.handleError)
      );
  }

}
