import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements OnChanges {

  @Input()
  cocktails: Cocktail[];

  @Input()
  favourites: Cocktail[];

  @Input()
  showFavourites: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Favourites changed: ', this.favourites);
  }

  isFavourite(cocktail: Cocktail): boolean {
    if(this.favourites) {
      return !!this.favourites.find((favouriteCocktail) => favouriteCocktail.id === cocktail.id);
    } else {
      return false;
    }
  }

}
