import { AfterViewInit, Component } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';
import { Comment } from '../models/comment.model';


@Component({
  selector: 'app-cocktail-page',
  templateUrl: './cocktail-page.component.html',
  styleUrls: ['./cocktail-page.component.scss']
})
export class CocktailPageComponent implements AfterViewInit {
  fallBackImgPath = 'assets/ginTonic.jpeg';

  cocktail: Cocktail;
  comments: Comment[];

  constructor( commentService: CocktailService, cocktailService: CocktailService) {
    cocktailService.getAllCocktails().subscribe((cocktails: Cocktail[]) => {
      cocktails.forEach((cocktail) => console.log(cocktail.cocktailName));
      console.log('got the cocktails: ', cocktails);
      this.cocktail = cocktails[0];
    });
    commentService.getAllComments().subscribe((comment: Comment[]) => {
      comment.forEach((cm) => console.log(cm));
      comment.forEach((cm) => {
        if (cm.cocktailId === this.cocktail.cocktailID) {
          this.comments.push(cm);
        }
      });
      console.log('got the comments: ', comment);
    });
  }

  ngAfterViewInit(): void { }

}
