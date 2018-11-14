import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocktailComponent } from './cocktail/cocktail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cocktail', component: CocktailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
