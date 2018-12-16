import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';
import { FavouriteService } from '../services/favourite.service';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.scss']
})
export class CocktailComponent implements OnInit {
  @Input()
  cocktail: Cocktail;

  fallBackPath = 'assets/ginTonic.jpeg';

  constructor(private cocktailService: CocktailService,
              public favouriteService: FavouriteService) {
    console.log('default visibility: ' + favouriteService.isFavourite);
  }

  ngOnInit() {
  }

  toggleFavourite(): void {
    if (this.favouriteService.isFavourite === true) {
      this.favouriteService.removeFromFavourites();
    } else {
      this.favouriteService.addToFavourites();
    }
    console.log('favourite status: ' + this.favouriteService.isFavourite);
  }
}
