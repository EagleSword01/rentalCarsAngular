import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { RentalsListService } from './new-rental.service';


import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { phoneNumberValidator } from 'src/app/shared/validators/phone-validator'
import { AngularFirestore } from '@angular/fire/firestore';
import { ClientsListService } from 'src/app/clients/new-client/new-client.service';
import { map, startWith } from 'rxjs/operators';
import { MatMomentDateModule, MomentDateAdapter } from "@angular/material-moment-adapter";
import { Observable } from 'rxjs';


export interface SatDatepickerRangeValue<D> {
  begin: D | null;
  end: D | null;
}

@Component({
  selector: 'app-new-rental',
  templateUrl: './new-rental.component.html',
  styleUrls: ['./new-rental.component.css']
})
export class NewRentalComponent implements OnInit {


  options: string[] = [];
  filteredOptions: Observable<string[]>;

   signupForm: FormGroup;
   randomId= "hello";
  clientss;
  cars;
    clientName = new FormControl('', Validators.required);
    carId = new FormControl('', Validators.required);

  constructor(private rentalsListService: RentalsListService,  private router: Router, private afs: AngularFirestore, private clientsListService: ClientsListService) { }

  ngOnInit() {
    this.afs.collection<any>('clients').valueChanges().subscribe(data => {
      this.options = data.map(a => a.name)
      this.filteredOptions = this.clientName.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
     })

    this.randomId =  Math.random().toString(36).replace('0.', '') ;


    this.signupForm = new FormGroup({
      clientName : new FormControl(''),
    carId : new FormControl(''),
      contractNumber: new FormControl( Validators.required),
      phone: new FormControl( Validators.required ),
      email: new FormControl([Validators.required, Validators.email]),
      cid: new FormControl(""),
      startDate: new FormControl(""),
      endDate: new FormControl(""),

    });
    this.afs.collection<any>('clients').valueChanges().subscribe(data => {
     this.clientss = data
    })
    this.afs.collection<any>('cars').valueChanges().subscribe(data => {
      this.cars = data
     })

  }








  onSubmit() {
    this.signupForm.patchValue({cid: this.randomId,  startDate: this.signupForm.value.phone.begin._i, endDate: this.signupForm.value.phone.end._i, clientName: this.clientName.value,  carId  : this.carId.value.carId, phone: ''})
    let data = this.signupForm.value;
    this.afs.collection('rentals').doc(data.cid).set(data)



    this.signupForm.reset();
    this.router.navigateByUrl('/rentals');
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


}

