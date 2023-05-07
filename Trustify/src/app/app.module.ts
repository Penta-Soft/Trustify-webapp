import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AreaPersonaleComponent } from './area-personale/area-personale.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { RecensioneComponent } from './recensione/recensione.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { GeneraRecensioneComponent } from './genera-recensione/genera-recensione.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WindowRefService } from './window-ref.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import Web3 from 'web3';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    SearchBarComponent,
    PagamentoComponent,
    AreaPersonaleComponent,
    StarRatingComponent,
    GeneraRecensioneComponent,
    RecensioneComponent,
    ProgressSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  providers: [WindowRefService, Web3],
  bootstrap: [AppComponent],
})
export class AppModule {}
