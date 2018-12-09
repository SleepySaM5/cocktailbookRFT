import { Component } from '@angular/core';
import { CocktailService } from './services/cocktail.service';
import { Cocktail } from './models/cocktail.model';
import { Ingredient } from './models/ingredient.model';
import { User, UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cocktails: Array<Cocktail>;
  ingredients: Array<Ingredient>;
  user: User;

  constructor(service: CocktailService,
              private authService: UserService) {
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

  onLoginClick(): void {
    this.authService.facebookLogin();
    /*this.authService.getCurrentUser().then((user: any) => {
      this.user = user;
    });*/
  }

  onWhoAmIClick(): void {
    this.authService.getCurrentUser().then((user: any) => {
      this.user = user;
    });
  }
}
