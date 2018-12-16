import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';
import { FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatChipInputEvent } from '@angular/material';
import { Ingredient } from '../models/ingredient.model';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/typings/esm5/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cocktail-create',
  templateUrl: './cocktail-create.component.html',
  styleUrls: ['./cocktail-create.component.scss']
})
export class CocktailCreateComponent implements OnInit {

  cocktail: Cocktail;

  cocktails: Cocktail[];
  searchResultCocktails: Cocktail[];
  errorText: string;

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredientCtrl = new FormControl();
  filteredIngredients: Observable<string[]>;
  activeIngredients: string[] = [];
  allIngredients: string[] = [];

  cocktailForm = new FormGroup({
    name: new FormControl(''),
    img: new FormControl(''),
    desc: new FormControl(''),
    ingredients: new FormControl([]),
  });

  @ViewChild('ingredientInput') ingredientInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private cocktailService: CocktailService, private router: Router) {
    cocktailService.getAllCocktails().subscribe((cocktails: Cocktail[]) => {
      this.cocktails = cocktails;
    });
    cocktailService.getAllIngredients().subscribe((ingredients: Ingredient[]) => {
      // @ts-ignore
      this.allIngredients = ingredients.map((ingredient) => ingredient);
    });
    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(null),
      map((ingredient: string | null) => ingredient ? this._filter(ingredient) : this.allIngredients.slice()));

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allIngredients.filter(ing => ing.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
  }

  onSubmit() {
    this.cocktail = new Cocktail(
      this.cocktailForm.value.name,
      this.activeIngredients,
      this.cocktailForm.value.desc,
      this.cocktailForm.value.img,
    );
    this.cocktailService.addCocktail(this.cocktail).subscribe(() => {
      this.router.navigate(['/browse']);
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

  selected(event: MatAutocompleteSelectedEvent): void {
    this.activeIngredients.push(event.option.viewValue);
    this.ingredientInput.nativeElement.value = '';
    this.ingredientCtrl.setValue(null);
  }

  remove(fruit: string): void {
    this.searchResultCocktails = [];
    this.errorText = '';

    const index = this.activeIngredients.indexOf(fruit);
    if (index >= 0) {
      this.activeIngredients.splice(index, 1);
    }
  }
}
