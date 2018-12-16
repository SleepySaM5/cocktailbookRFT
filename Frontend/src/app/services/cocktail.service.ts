import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Cocktail } from '../models/cocktail.model';
import { Ingredient } from '../models/ingredient.model';
import { Comment } from '../models/comment.model';
import { catchError, map } from 'rxjs/operators';
import { backendURL } from '../../../../config/constants';
import { concat, uniq } from 'lodash';

@Injectable()
export class CocktailService {

  cocktails: Cocktail[] = [];
  ingredients: Ingredient[] = [];

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
    return this.http.get<any[]>(backendURL + '/cocktail')
      .pipe((map((cocktails: any[]) => {
        return cocktails.map((cocktail: any) =>
          new Cocktail(
            cocktail.name,
            cocktail.ingredientList,
            cocktail.description,
            cocktail.imgPath,
            cocktail.imgAlt,
            cocktail._id));
      })));
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
    return this.http.get<Cocktail[]>(backendURL + '/cocktail/filter?ingredients=' + ingredients);
  }

  getAllComments(): Observable<Comment[]> {
    if (!localStorage.getItem('id_token')) {
      return of(null);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token':  localStorage.getItem('id_token'),
      })
    };
    console.log('http Options aws:', httpOptions);
    return this.http.get<Comment[]>(backendURL + '/comments', httpOptions)
      .pipe( map((comments) => {
        return comments.map((comment: any) => {
          return new Comment(comment.cocktailID,
            comment.date,
            comment.content,
            comment.author);
        })
      }));
  }

  addCocktail(cocktail: Cocktail): Observable<Cocktail> {
    console.log('cocktail added');
    return this.http.post<Cocktail>(backendURL + '/cocktail', cocktail)
      .pipe(
        catchError(this.handleError)
      );
  }

  addComment(comment: Comment): Observable<Comment> {
    console.log(comment);
    if (!localStorage.getItem('id_token')) {
      return of(null);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token':  localStorage.getItem('id_token'),
      })
    };
    console.log('http Options aws:', httpOptions);

    return this.http.post<Comment>(backendURL + '/comment', comment, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
