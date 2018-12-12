import { AfterViewInit, Component } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { Comment } from '../models/comment.model';
import { CocktailService } from '../services/cocktail.service';


@Component({
  selector: 'app-cocktail-page',
  templateUrl: './cocktail-page.component.html',
  styleUrls: ['./cocktail-page.component.scss']
})
export class CocktailPageComponent implements AfterViewInit {
  fallBackImgPath = 'assets/ginTonic.jpeg';

  cocktail: Cocktail;
  comments: Comment[];

  constructor( commentService: CocktailService) {
    commentService.getAllComments().subscribe((comment: Comment[]) => {
      comment.forEach((cm) => console.log(cm));
      comment.forEach((cm) => {
        if (cm.commentId === this.cocktail.cocktailID) {
          this.comments.push(cm);
        }
      });
      console.log('got the comments: ', comment);
    });
  }

  ngAfterViewInit(): void { }

}
