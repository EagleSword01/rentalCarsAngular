import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarsListService } from './new-car.service';

import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { phoneNumberValidator } from 'src/app/shared/validators/phone-validator'
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {
   signupForm: FormGroup;
   randomId= "hello";

  constructor(private carsService: CarsListService,  private router: Router, private afs: AngularFirestore) { }

  ngOnInit() {
    this.randomId =  Math.random().toString(36).replace('0.', '') ;



    this.signupForm = new FormGroup({
      carId: new FormControl( Validators.required),
      carName: new FormControl( Validators.required),
      licensePlate: new FormControl( [Validators.required, this.ssnValidator] ),
      yearPurchased: new FormControl(Validators.required),
      cid: new FormControl(""),
    });


  }








  onSubmit() {
    this.signupForm.patchValue({ cid: this.randomId });

    let data = this.signupForm.value;
    this.afs.collection('cars').doc(data.cid).set(data)



    this.signupForm.reset();
    this.router.navigateByUrl('/cars');
  }
   ssnValidator(control: FormControl): {[key: string]: any} {
    const value: string = control.value || '';
    const valid = value.match(/^\d{9}$/);
    return valid ? null : {ssn: true};
  }



}

