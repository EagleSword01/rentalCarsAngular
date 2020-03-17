import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { RentalsComponent } from './rentals/rentals.component';
import { NewRentalComponent } from './rentals/new-rental/new-rental.component';
import { NewClientComponent } from './clients/new-client/new-client.component';
import { CarsComponent } from './cars/cars.component';
import { NewCarComponent } from './cars/new-car/new-car.component';
import { ClientsComponent } from './clients/clients.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientsListService } from './clients/new-client/new-client.service';
import { ClientEditComponent } from './clients/client-edit/client-edit.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';





import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { CarEditComponent } from './cars/car-edit/car-edit.component';
import { CarsListService } from './cars/new-car/new-car.service';
import { RentalsListService } from './rentals/new-rental/new-rental.service';

@NgModule({
  declarations: [
    AppComponent,
    RentalsComponent,
    NewRentalComponent,
    CarsComponent,
    NewCarComponent,
    ClientsComponent,
    NewClientComponent,
    HeaderComponent,
    FooterComponent,
    ClientEditComponent,
    LoadingSpinnerComponent,
    CarEditComponent,



  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig ),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatInputModule,
    MatTableModule,

  ],
  exports: [
    MatSortModule,
    MatInputModule,
    MatTableModule,


  ],
  providers: [ClientsListService, AngularFirestore, CarsListService,  RentalsListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
