import {AfterViewInit, Component, Input} from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { Ingredient } from '../models/ingredient.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-cocktail-browse',
  templateUrl: './cocktail-browse.component.html',
  styleUrls: ['./cocktail-browse.component.scss']
})
export class CocktailBrowseComponent implements AfterViewInit {

  @Input()
  cocktails: Cocktail[];

  @Input()
  ingredients: Ingredient[];


  options: Array<string>;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;


  ngAfterViewInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    /*
    this.ingredients.forEach(ing => {
      this.options.push(ing.name);
    });
    */

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  constructor() { }

}
