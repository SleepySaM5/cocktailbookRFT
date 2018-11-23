import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cocktail } from '../models/cocktail.model';
import {Ingredient} from '../models/ingredient.model';

@Injectable()
export class CocktailService {

  readonly URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllCocktails(): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(this.URL + '/cocktails');
  }

  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.URL + '/ingredients');
  }
}
