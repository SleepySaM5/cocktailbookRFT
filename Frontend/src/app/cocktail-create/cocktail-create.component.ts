import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cocktail-create',
  templateUrl: './cocktail-create.component.html',
  styleUrls: ['./cocktail-create.component.scss']
})
export class CocktailCreateComponent implements OnInit {

  cocktail: Cocktail;

  cocktailForm = new FormGroup({
    name: new FormControl(''),
    img: new FormControl(''),
    desc: new FormControl(''),
    ingredients: new FormControl('', Validators.pattern('(\\S[^0-9,]*,\\s*)+\\S[^0-9,]*$'))
  });

  constructor(private cocktailService: CocktailService) {

  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.cocktailForm.value);
    this.cocktail = new Cocktail(this.cocktailForm.value.name, this.cocktailForm.value.ingredients,
      this.cocktailForm.value.img, this.cocktailForm.value.desc);
    console.log(this.cocktail);
  }
  // upload() {
  //   console.log(this);
  //   this.cocktailService.addCocktail(this.cocktail);
  //  // this.cocktail.cocktailName=
  // }
}
