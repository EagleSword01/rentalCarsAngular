import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import { ClientsListService } from 'src/app/clients/new-client/new-client.service';
import { map } from 'rxjs/operators';
import { Client } from 'src/app/shared/newClient.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

export interface PeriodicElement {
  name: string;
  address: string;
  phone: string;
  email: string;
}





@Component({
   selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'address', 'phone', 'email', 'action'];
  dataSource: any;
  data: any;
  dataFixed: any;
  clients: Client[];


  private subscription: Subscription;

  constructor(private clientsListService: ClientsListService,
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
    this.afs.collection<any>('clients').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })
  }

  onDeleteClient = data => this.clientsListService.deleteClient(data);



  // onEditClient = data =>
  //       this.clientsListService
  // .getClient(data).subscribe(res => (data = res) )

  onEditClient(data) {
    console.log(data.cid);



    this.router.navigate(['/clientedit', data.cid  ]);
  }






  clientss;

getClientss = () => {
  return  this.clientsListService
  .getClientss().pipe(map(res => (this.clientss = res) ))
}



}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
