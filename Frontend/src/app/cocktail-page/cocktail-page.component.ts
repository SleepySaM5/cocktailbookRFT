import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';

@Component({
  selector: 'app-cocktail-page',
  templateUrl: './cocktail-page.component.html',
  styleUrls: ['./cocktail-page.component.scss']
})
export class CocktailPageComponent implements AfterViewInit {

  myImgPath = 'assets/ginTonic.jpeg';

  cocktail: Cocktail;

  ngAfterViewInit(): void {
  }

  constructor(cocktailService: CocktailService) {
  cocktailService.getAllCocktails().subscribe( (cocktails: Cocktail[]) => {
      cocktails.forEach((cocktail) => console.log(cocktail.cocktailName));
      console.log('got the cocktails: ', cocktails);
      this.cocktail = cocktails[0];
    });
  }


}
