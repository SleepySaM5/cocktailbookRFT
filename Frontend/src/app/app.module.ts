import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CocktailService } from './services/cocktail.service';
import { HttpClientModule } from '@angular/common/http';
import { CocktailComponent } from './cocktail/cocktail.component';
import { MatCardModule } from '@angular/material/card';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { CocktailPageComponent } from './cocktail-page/cocktail-page.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    CocktailComponent,
    CocktailListComponent,
    CocktailPageComponent
  ],
  imports: [
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    MatDividerModule
  ],
  providers: [
    CocktailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
