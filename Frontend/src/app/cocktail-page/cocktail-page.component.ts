import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';
import { Comment } from '../models/comment.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cocktail-page',
  templateUrl: './cocktail-page.component.html',
  styleUrls: ['./cocktail-page.component.scss']
})
export class CocktailPageComponent implements AfterViewInit, OnInit {
  fallBackImgPath = 'assets/ginTonic.jpeg';

  cocktail = new Cocktail('',
    [''],
    '',
    '',
    '',
    0);
  comments: Comment[];

  private sub: any;

  constructor( private commentService: CocktailService,
               private cocktailService: CocktailService,
               private route: ActivatedRoute) {
    /*
    cocktailService.getAllCocktails().subscribe((cocktails: Cocktail[]) => {
      cocktails.forEach((cocktail) => console.log(cocktail.name));
      console.log('got the cocktails: ', cocktails);
      this.cocktail = cocktails[0];
    });
    */

    commentService.getAllComments().subscribe((comment: Comment[]) => {
      comment.forEach((cm) => console.log(cm));
      comment.forEach((cm: Comment) => {
        if (cm.cocktailId === this.cocktail.id.toString()) {
          this.comments.push(cm);
        }
      });
      console.log('got the comments: ', comment);
    });
  }

  ngAfterViewInit(): void { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('ng on init');
      this.cocktail.id = params['id'];
      console.log('setting params');
      this.cocktailService.getCocktailById(this.cocktail.id).subscribe(cocktail => {
        this.cocktail = cocktail;
        console.log('success');
      });
    });
  }

}
