import { AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { Ingredient } from '../models/ingredient.model';
import { CocktailService } from '../services/cocktail.service';
import { FormControl} from '@angular/forms';
import { Observable} from 'rxjs';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocomplete, MatChipInputEvent} from '@angular/material';
import { map, startWith} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent} from '@angular/material/typings/esm5/autocomplete';




@Component({
  selector: 'app-cocktail-browse',
  templateUrl: './cocktail-browse.component.html',
  styleUrls: ['./cocktail-browse.component.scss']
})
export class CocktailBrowseComponent implements AfterViewInit {

  cocktails: Cocktail[];

  ingredients: Ingredient[];

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

  constructor(cocktailService: CocktailService, ingredientService: CocktailService) {
    cocktailService.getAllCocktails().subscribe((cocktails: Cocktail[]) => {
      cocktails.forEach((cocktail) => console.log(cocktail.cocktailName));
      console.log('got the cocktails: ', cocktails);
      this.cocktails = cocktails;
    });
    ingredientService.getAllIngredients().subscribe((ingredients: Ingredient[]) => {
      ingredients.forEach((ingredient) => console.log(ingredient.name));
      ingredients.forEach(ing => this.allIngredients.push(ing.name));
      console.log('got the ingredientList: ', ingredients);
      this.ingredients = ingredients;
    });
    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(null),
      map((ingredient: string | null) => ingredient ? this._filter(ingredient) : this.allIngredients.slice()));
  }

  ngAfterViewInit() {
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
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
}


