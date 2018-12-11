import { AfterViewInit, Component } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';

@Component({
  selector: 'app-cocktail-page',
  templateUrl: './cocktail-page.component.html',
  styleUrls: ['./cocktail-page.component.scss']
})
export class CocktailPageComponent implements AfterViewInit {
  fallBackImgPath = 'assets/ginTonic.jpeg';

  cocktail: Cocktail;

  ngAfterViewInit(): void { }

}
