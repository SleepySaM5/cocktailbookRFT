import { Component } from '@angular/core';
import { CocktailService } from './services/cocktail.service';
import { Cocktail } from './models/cocktail.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor() {}

  toggleSidenav(): void {

  }

}
