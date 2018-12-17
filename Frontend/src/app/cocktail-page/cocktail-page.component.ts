import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';
import { Comment } from '../models/comment.model';
import { ActivatedRoute, Router } from '@angular/router';


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
               private route: ActivatedRoute,
               private router: Router) {
    /*
    cocktailService.getAllCocktails().subscribe((cocktails: Cocktail[]) => {
      cocktails.forEach((cocktail) => console.log(cocktail.name));
      console.log('got the cocktails: ', cocktails);
      this.cocktail = cocktails[0];
    });
    */

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

  back(): void {
    this.router.navigate(['/browse']);
  }

}
