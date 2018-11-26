import { AfterViewInit, Component, Input } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { Ingredient } from '../models/ingredient.model';
import { CocktailService } from '../services/cocktail.service';


@Component({
  selector: 'app-cocktail-browse',
  templateUrl: './cocktail-browse.component.html',
  styleUrls: ['./cocktail-browse.component.scss']
})
export class CocktailBrowseComponent implements AfterViewInit {

  cocktails: Cocktail[];

  ingredients: Ingredient[];


  ngAfterViewInit() {

  }

  constructor(cocktailService: CocktailService, ingredientService: CocktailService) {
    cocktailService.getAllCocktails().subscribe( (cocktails: Cocktail[]) => {
      cocktails.forEach((cocktail) => console.log(cocktail.name));
      console.log('got the cocktails: ', cocktails);
      this.cocktails = cocktails;
    });

    ingredientService.getAllIngredients().subscribe( (ingredients: Ingredient[]) => {
      ingredients.forEach((ingredient) => console.log(ingredient.name));
      console.log('got the ingredients: ', ingredients);
      this.ingredients = ingredients;
    });
  }

}
