import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { RentalsComponent } from './rentals/rentals.component';

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
import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, SatDatepickerModule } from 'saturn-datepicker'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { CarEditComponent } from './cars/car-edit/car-edit.component';
import { CarsListService } from './cars/new-car/new-car.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RentalsListService } from './rentals/new-rental/new-rental.service';
import { NewRentalComponent } from './rentals/new-rental/new-rental.component';
import { RentalEditComponent } from './rentals/rental-edit/rental-edit.component';
import { TestComponent } from './test/test.component';


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
    RentalEditComponent,
    TestComponent,




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
    MatFormFieldModule,
    MatSelectModule,
    SatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
  ],
  exports: [
    MatSortModule,
    MatInputModule,
    MatTableModule,


  ],
  providers: [ClientsListService, AngularFirestore, CarsListService,RentalsListService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},],
  bootstrap: [AppComponent]
})
export class AppModule { }
