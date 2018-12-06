import { Component } from '@angular/core';
import { CocktailService } from './services/cocktail.service';
import { Cocktail } from './models/cocktail.model';
import { Ingredient } from './models/ingredient.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'the Cocktail Book';
  cocktails: Array<Cocktail>;
  ingredients: Array<Ingredient>;

  constructor(service: CocktailService) {
    service.getAllCocktails().subscribe( (cocktails: Cocktail[]) => {
      cocktails.forEach((cocktail) => console.log(cocktail.cocktailName));
      console.log('got the cocktails: ', cocktails);
      this.cocktails = cocktails;
    });
    /*service.getAllIngredients().subscribe( (ingredients: Ingredient[]) => {
      ingredients.forEach((ingredient) => console.log(ingredient.name));
      console.log('got the ingredientList: ', ingredients);
      this.ingredients = ingredients;
    });*/
  }

}
