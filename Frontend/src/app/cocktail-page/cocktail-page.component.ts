import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';

@Component({
  selector: 'app-cocktail-page',
  templateUrl: './cocktail-page.component.html',
  styleUrls: ['./cocktail-page.component.scss']
})
export class CocktailPageComponent implements AfterViewInit {

  myImgPath = 'assets/Bazs.png';

  @Input()
  cocktail: Cocktail;

  ngAfterViewInit(): void {
  }

  constructor() { }


}
