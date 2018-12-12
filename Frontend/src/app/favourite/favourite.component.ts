import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { MatAutocomplete } from '@angular/material';
import { CocktailService } from '../services/cocktail.service';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements AfterViewInit {

  cocktails: Cocktail[] = [];
  allIngredients: string[] = [];

  @ViewChild('ingredientInput') ingredientInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private cocktailService: CocktailService,
              ingredientService: CocktailService) {
    cocktailService.getAllCocktails().subscribe((cocktails: Cocktail[]) => {
      cocktails.forEach((cocktail) => console.log(cocktail.cocktailName));
      console.log('got the cocktails: ', cocktails);
      this.cocktails = cocktails;
    });
    cocktailService.getAllIngredients().subscribe((ingredients: Ingredient[]) => {
      // @ts-ignore
      this.allIngredients = ingredients.map((ingredient) => ingredient);
    });
  }

  ngAfterViewInit() {
  }
}
