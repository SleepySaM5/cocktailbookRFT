import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CocktailService } from './services/cocktail.service';
import { HttpClientModule } from '@angular/common/http';
import { CocktailComponent } from './cocktail/cocktail.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    CocktailComponent
  ],
  imports: [
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CocktailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
