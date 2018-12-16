import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { Ingredient } from '../models/ingredient.model';
import { CocktailService } from '../services/cocktail.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatChipInputEvent } from '@angular/material';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/typings/esm5/autocomplete';
import { Router } from '@angular/router';
import { FavouriteService } from "../services/favourite.service";
import { AuthService } from "../../../../Backend/lib/auth";
import { UserService } from "../services/user.service";


@Component({
  selector: 'app-cocktail-browse',
  templateUrl: './cocktail-browse.component.html',
  styleUrls: ['./cocktail-browse.component.scss']
})
export class CocktailBrowseComponent implements AfterViewInit {

  cocktails: Cocktail[];
  favourites: Cocktail[];
  showFavourites: boolean = false;
  searchResultCocktails: Cocktail[];
  errorText: string;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredientCtrl = new FormControl();
  filteredIngredients: Observable<string[]>;
  activeIngredients: string[] = [];
  allIngredients: string[] = [];

  @ViewChild('ingredientInput') ingredientInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private cocktailService: CocktailService,
              private favouriteService: FavouriteService,
              private authService: UserService,
              ingredientService: CocktailService,
              private router: Router) {
    cocktailService.getAllCocktails().subscribe((cocktails: Cocktail[]) => {
      cocktails.forEach((cocktail) => console.log(cocktail.name));
      this.cocktails = cocktails;
    });

    this.getFavourites();

    favouriteService.favouritesSubject.subscribe((favourites) => {
      this.favourites = favourites;
    });

    this.authService.isLoggedIn().then((isLoggedIn: boolean) => {
      this.showFavourites = isLoggedIn;
    });

    this.authService.loginFinished.subscribe(() => {
      this.showFavourites = true;
      this.getFavourites();

    });

    cocktailService.getAllIngredients().subscribe((ingredients: Ingredient[]) => {
      // @ts-ignore
      this.allIngredients = ingredients.map((ingredient) => ingredient);
    });
    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(null),
      map((ingredient: string | null) => ingredient ? this._filter(ingredient) : this.allIngredients.slice()));
  }

  ngAfterViewInit() {
  }

  getFavourites(): void {
    this.favouriteService.getAllFavourites().subscribe((favourites) => {
      this.favourites = favourites;
    });
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    this.searchResultCocktails = [];
    this.errorText = '';
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.activeIngredients.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.ingredientCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    this.searchResultCocktails = [];
    this.errorText = '';

    const index = this.activeIngredients.indexOf(fruit);
    if (index >= 0) {
      this.activeIngredients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.activeIngredients.push(event.option.viewValue);
    this.ingredientInput.nativeElement.value = '';
    this.ingredientCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allIngredients.filter(ing => ing.toLowerCase().indexOf(filterValue) === 0);
  }

  onSearch(): void {
    this.cocktailService.search(this.activeIngredients).subscribe((cocktails) => {
      if (cocktails && cocktails.length) {
        this.searchResultCocktails = cocktails;
      } else {
        this.errorText = 'No cocktails match the search!';
      }
    });
  }

  addCocktail(): void {
    this.router.navigate(['/create']);
  }
}


