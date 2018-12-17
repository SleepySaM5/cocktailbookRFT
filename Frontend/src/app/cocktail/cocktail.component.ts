import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';
import { FavouriteService } from '../services/favourite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cocktail',
  templateUrl: 'cocktail.component.html',
  styleUrls: ['cocktail.component.scss']
})
export class CocktailComponent implements OnInit {
  @Input()
  cocktail: Cocktail;

  @Input()
  isFavorite = false;

  @Input()
  showFavourite = false;

  fallBackPath = 'assets/ginTonic.jpeg';

  constructor(private cocktailService: CocktailService,
              public favouriteService: FavouriteService,
              private router: Router) {  }

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
        });
    } else {
      this.favouriteService.addToFavourites(this.cocktail)
        .subscribe((res: boolean) => {
          if (res) {
            this.isFavorite = true;
          }
        });
    }
  }

  navigateToCocktailPage() {
    this.cocktailService.getCocktailById(this.cocktail.id).subscribe(result => {
      console.log(result);
      this.router.navigate(['/cocktail/' + (<any>result)._id]);
    });
    console.log(this.cocktail.id);
  }

  logCocktail(): void {
    console.log(this.cocktail.name + this.cocktail.id);
  }
}
