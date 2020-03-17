import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/shared/newClient.model';
import { ClientsListService } from './new-client.service';

import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { phoneNumberValidator } from 'src/app/shared/validators/phone-validator'
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
   signupForm: FormGroup;
   randomId= "hello";

  constructor(private slService: ClientsListService,  private router: Router, private afs: AngularFirestore) { }

  ngOnInit() {
    this.randomId =  Math.random().toString(36).replace('0.', '') ;



    this.signupForm = new FormGroup({
      name: new FormControl( Validators.required),
       address: new FormControl( Validators.required),
       phone: new FormControl( [Validators.required, this.ssnValidator] ),
      email: new FormControl([Validators.required, Validators.email]),
      cid: new FormControl(""),
    });


  }








  onSubmit() {
    this.signupForm.patchValue({ cid: this.randomId });

    let data = this.signupForm.value;
    this.afs.collection('clients').doc(data.cid).set(data)



    this.signupForm.reset();
    this.router.navigateByUrl('/clients');
  }
   ssnValidator(control: FormControl): {[key: string]: any} {
    const value: string = control.value || '';
    const valid = value.match(/^\d{9}$/);
    return valid ? null : {ssn: true};
  }



}

