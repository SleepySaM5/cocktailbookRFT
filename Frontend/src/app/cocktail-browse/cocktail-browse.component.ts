import {AfterViewInit, Component, Input} from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { Ingredient } from '../models/ingredient.model';


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



  ngAfterViewInit() {
  }



  constructor() { }

}
