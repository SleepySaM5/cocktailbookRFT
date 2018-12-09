import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements AfterViewInit {

  @Input()
  cocktails: Cocktail[];


  ngAfterViewInit(): void {
    console.log('afterviewinit: ', this);
  }

  constructor() {
    console.log('list is alive');
  }


}
