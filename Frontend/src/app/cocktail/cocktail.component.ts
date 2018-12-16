import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';
import { FavouriteService } from '../services/favourite.service';

@Component({
  selector: 'app-cocktail',
  templateUrl: 'cocktail.component.html',
  styleUrls: ['cocktail.component.scss']
})
export class CocktailComponent implements OnInit {
  @Input()
  cocktail: Cocktail;

  @Input()
  isFavorite: boolean = false;

  @Input()
  showFavourite: boolean = false;

  fallBackPath = 'assets/ginTonic.jpeg';

  constructor(private cocktailService: CocktailService,
              public favouriteService: FavouriteService) {

  }

  ngOnInit() {
  }

  toggleFavourite(): void {
    console.log('Toggling :', this.cocktail.name, ' who was favourite: ', this.isFavorite);
    if (this.isFavorite) {
      this.favouriteService.removeFromFavourites(this.cocktail)
        .subscribe((res: boolean) => {
          if (res) {
            this.isFavorite = false;
          }
        })
    } else {
      this.favouriteService.addToFavourites(this.cocktail)
        .subscribe((res: boolean) => {
          if (res) {
            this.isFavorite = true;
          }
        })
    }

  }
}
