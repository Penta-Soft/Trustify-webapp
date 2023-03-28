import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagamentoComponent } from './pagamento/pagamento.component';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { HomePageComponent } from './home-page/home-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

import { AreaPersonaleComponent } from './area-personale/area-personale.component';

@NgModule({
  declarations: [
    AppComponent,

    FooterComponent,
    HeaderComponent,

    HomePageComponent,
    SearchBarComponent,

    PagamentoComponent,
    AreaPersonaleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
