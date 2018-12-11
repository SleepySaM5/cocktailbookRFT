import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.scss']
})
export class CocktailComponent implements OnInit {
  @Input()
  cocktail: Cocktail;

  fallBackPath = 'assets/ginTonic.jpeg';

  constructor() { }

  ngOnInit() {
  }

}
