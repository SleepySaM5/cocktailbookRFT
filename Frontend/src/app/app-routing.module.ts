import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocktailComponent } from './cocktail/cocktail.component';
import { HomeComponent } from './home/home.component';
import { CocktailBrowseComponent } from './cocktail-browse/cocktail-browse.component';
import { CocktailPageComponent } from './cocktail-page/cocktail-page.component';
<<<<<<< HEAD
=======
import { LoginComponent } from './login/login.component';
import {NewCocktailComponent} from './new-cocktail/new-cocktail.component';
>>>>>>> origin/cocktail-components-part3

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cocktail', component: CocktailComponent },
  { path: 'browse', component: CocktailBrowseComponent },
<<<<<<< HEAD
  { path: 'page', component: CocktailPageComponent }
=======
  { path: 'page', component: CocktailPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: NewCocktailComponent }
>>>>>>> origin/cocktail-components-part3
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
