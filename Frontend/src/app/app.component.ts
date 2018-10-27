import { Component } from '@angular/core';
import { CocktailService } from './services/cocktail.service';
import { Cocktail } from './models/cocktail.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  constructor(service: CocktailService) {
    service.getAllCocktails().subscribe( (cocktails: Cocktail[]) => {
      cocktails.forEach((cocktail) => console.log(cocktail.name));
    });

  }
}
