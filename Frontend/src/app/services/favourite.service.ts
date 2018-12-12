import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';
import { backendURL } from '../../../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  favourites: Cocktail[] = [];
  isFavourite = false;

  constructor(private http: HttpClient) { }

  addToFavourites(): Promise<boolean> {
    return Promise.resolve(true).then((): boolean => {
      this.isFavourite = true;
      console.log('added to favourites');
      return true;
    });
  }

  removeFromFavourites(): void {
    this.isFavourite = false;
    console.log('removed from favourites');
  }

  getAllFavourites(): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(backendURL + '/favourite');
  }
}
