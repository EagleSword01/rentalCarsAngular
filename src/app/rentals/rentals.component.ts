import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import { RentalsListService } from 'src/app/rentals/new-rental/new-rental.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

export interface PeriodicElement {
  contractNumber: string;
  clientName: string;
  carId: string;
  startDate: string;
  endDate: string;
}





@Component({
   selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements AfterViewInit {
  displayedColumns: string[] = ['contractNumber', 'carId', 'clientName', 'startDate', 'endDate', 'action'];
  dataSource: any;
  data: any;
  dataFixed: any;



  private subscription: Subscription;

  constructor(private rentalsListService: RentalsListService,
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
    this.afs.collection<any>('rentals').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })
  }

  onDeleteRental = data => this.rentalsListService.deleteRental(data);



  // onEditClient = data =>
  //       this.clientsListService
  // .getClient(data).subscribe(res => (data = res) )

  onEditRental(data) {
    console.log(data.cid);



    this.router.navigate(['/rentaledit', data.cid  ]);
  }






  rentals;

getRentals = () => {
  return  this.rentalsListService
  .getRentals().pipe(map(res => (this.rentals = res) ))
}



}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
