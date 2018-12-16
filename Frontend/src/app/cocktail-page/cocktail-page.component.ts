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
  comments: Comment[] = [];

  constructor( commentService: CocktailService, cocktailService: CocktailService) {
    cocktailService.getAllCocktails().subscribe((cocktails: Cocktail[]) => {
      cocktails.forEach((cocktail) => console.log(cocktail.name));
      console.log('got the cocktails: ', cocktails);
      this.cocktail = cocktails[0];
    });

    commentService.getAllComments().subscribe((comments: Comment[]) => {
      comments.forEach((cm) => console.log(cm));
      comments.forEach((cm: Comment) => {
        if (cm.cocktailId === this.cocktail.id.toString()) {
          this.comments.push(cm);
        }
      });
      console.log('got the comments: ', comments);
    });
  }

  ngAfterViewInit(): void { }

}
