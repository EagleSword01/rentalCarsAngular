import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import { map } from 'rxjs/operators';
import { Client } from 'src/app/shared/newClient.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { CarsListService } from './new-car/new-car.service';

export interface PeriodicElement {
  carId: string;
  carName: string;
  licensePlate: string;
  yearPurchased: string;
}





@Component({
   selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements AfterViewInit {
  displayedColumns: string[] = ['carId', 'carName', 'licensePlate', 'yearPurchased', 'action'];
  dataSource: any;
  data: any;
  dataFixed: any;



  private subscription: Subscription;

  constructor(  private carsListService: CarsListService,
    private route: ActivatedRoute,
              private router: Router,
              private afs: AngularFirestore,

    ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngAfterViewInit() {
    this.afs.collection<any>('cars').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })
  }

  onDeleteCar = data => this.carsListService.deleteCar(data);



  // onEditClient = data =>
  //       this.clientsListService
  // .getClient(data).subscribe(res => (data = res) )

  onEditCar(data) {
    console.log(data.cid);



    this.router.navigate(['/caredit', data.cid  ]);
  }






  cars;

getCars = () => {
  return  this.carsListService
  .getCars().pipe(map(res => (this.cars = res) ))
}



}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
