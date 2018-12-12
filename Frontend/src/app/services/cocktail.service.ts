import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cocktail } from '../models/cocktail.model';
import { Ingredient } from '../models/ingredient.model';
import { Comment } from '../models/comment.model';

import { map } from 'rxjs/operators';
import { concat, uniq } from 'lodash';

@Injectable()
export class CocktailService {

  cocktails: Cocktail[] = [];
  ingredients: Ingredient[] = [];
  readonly URL = 'https://localhost:3000';

  constructor(private http: HttpClient) {}

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

}
