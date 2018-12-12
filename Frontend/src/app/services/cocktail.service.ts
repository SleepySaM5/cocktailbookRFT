import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cocktail } from '../models/cocktail.model';
import { Ingredient } from '../models/ingredient.model';
import { backendURL } from '../../../../config/constants';
import { map } from 'rxjs/operators';
import { concat, uniq } from 'lodash';

@Injectable()
export class CocktailService {

  cocktails: Cocktail[] = [];
  ingredients: Ingredient[] = [];

  constructor(private http: HttpClient) {}

  getAllCocktails(): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(backendURL + '/cocktail');
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

}
