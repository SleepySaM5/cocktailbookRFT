import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocktailComponent } from './cocktail/cocktail.component';
import { HomeComponent } from './home/home.component';
import { CocktailBrowseComponent } from './cocktail-browse/cocktail-browse.component';
import { CocktailPageComponent } from './cocktail-page/cocktail-page.component';
import { LoginComponent } from './login/login.component';
import {NewCocktailComponent} from './new-cocktail/new-cocktail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cocktail', component: CocktailComponent },
  { path: 'browse', component: CocktailBrowseComponent },
  { path: 'page', component: CocktailPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: NewCocktailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
