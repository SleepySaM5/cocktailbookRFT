import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  cocktails: Array<Cocktail>;

  public loggedIn: boolean;
  user: User;

  constructor(service: CocktailService, private authService: UserService) {
    service.getAllCocktails().subscribe( (cocktails: Cocktail[]) => {
      cocktails.forEach((cocktail) => console.log(cocktail.name));
      this.cocktails = cocktails;
    });

    this.authService.isLoggedIn().then((loggedIn) => {
      this.loggedIn = loggedIn;
    });

    this.authService.getCurrentUser().then((user: any) => {
      this.user = user;
    });
  }
}
