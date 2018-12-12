import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from "../services/cocktail.service";

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.scss']
})
export class CocktailComponent implements OnInit {
  @Input()
  cocktail: Cocktail;
  favourite: boolean;

  fallBackPath = 'assets/ginTonic.jpeg';

  constructor(private cocktailService: CocktailService) {
    this.favourite = true;
    console.log('default visibility: ' + this.favourite);
  }

  ngOnInit() {
  }

  toggleFavourite(): void {
    if (this.favourite === true) {
      this.favourite = false;
    } else {
      this.favourite = true;
    }
    console.log('visibility changed: ' + this.favourite);
  }

}
