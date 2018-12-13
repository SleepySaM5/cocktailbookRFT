import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';

@Component({
  selector: 'app-cocktail-create',
  templateUrl: './cocktail-create.component.html',
  styleUrls: ['./cocktail-create.component.scss']
})
export class CocktailCreateComponent implements OnInit {

  cocktail: Cocktail;

  constructor(private cocktailService: CocktailService) { }

  ngOnInit() {
  }

  upload() {
    console.log(this);
    this.cocktailService.addCocktail(this.cocktail);
   // this.cocktail.cocktailName=
  }
}
