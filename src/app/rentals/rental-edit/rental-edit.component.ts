import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RentalsListService } from '../new-rental/new-rental.service';
import { FormGroup, FormControl, Validators, FormArray, AsyncValidatorFn, NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatTableDataSource} from '@angular/material/table';
import { MatMomentDateModule, MomentDateAdapter } from "@angular/material-moment-adapter";
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
export interface SatDatepickerRangeValue<D> {
  begin: D | null;
  end: D | null;
}


@Component({
  selector: 'app-rental-edit',
  templateUrl: './rental-edit.component.html',
  styleUrls: ['./rental-edit.component.css']
})
export class RentalEditComponent implements OnInit {


  options: string[] = [];
  filteredOptions: Observable<string[]>;

  oldRental;
  clientss;
  cars;
  clientName = new FormControl('', Validators.required);
    carId = new FormControl('', Validators.required);
  phone = new FormControl('', Validators.required);
  editForm: FormGroup;
  loadRental = id =>
  this.rentalsListService
.getRental(id).subscribe(res => {
  this.oldRental= res.data()
  console.log(this.oldRental);
  this.editForm.patchValue({

    'contractNumber': this.oldRental.contractNumber,
      "email": this.oldRental.email,
      'clientName': this.oldRental.clientName,
      'startDate':this.oldRental.startDate.month + '/' + this.oldRental.startDate.date +'/' +this.oldRental.startDate.year ,
      'phone' :  + ' - '+ this.oldRental.endDate.month + '/' + this.oldRental.endDate.date +'/' +this.oldRental.endDate.year,
      'carId' : this.oldRental.carId,

  });
console.log(res)

}


 )


  id: number;


  constructor(private router: Router, private route: ActivatedRoute, private afs: AngularFirestore,  private rentalsListService: RentalsListService) {
  }


  // this.route.paramMap.subscribe(params =>{
  //   const id = +params.get('i');
  //   if(id>=0){
  //     this.getclient(id);
  //   }
  // })

  ngOnInit() {

this.afs.collection<any>('clients').valueChanges().subscribe(data => {
      this.options = data.map(a => a.name)
      this.filteredOptions = this.clientName.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
     })

      let id =this.route.snapshot.paramMap.get('id');

      this.afs.collection<any>('cars').valueChanges().subscribe(data => {
        this.cars = data
       })

        this.loadRental(id);





    this.editForm = new FormGroup({
      carId: new FormControl(  Validators.required),
      clientName: new FormControl(  Validators.required),
      contractNumber: new FormControl( Validators.required),
      startDate: new FormControl( Validators.required),
      phone: new FormControl( Validators.required ),
      email: new FormControl([Validators.required, Validators.email]),
    });





  }


  rental = {};
  onSubmit() {
    this.editForm.patchValue({  startDate: this.editForm.value.phone.begin._i, endDate: this.editForm.value.phone.end._i, clientName: this.clientName.value,  carId  : this.carId.value.carId, phone: ''})
    let data = this.editForm.value;
    this.afs.collection('rentals').doc(data.cid).set(data)



    this.editForm.reset();
    this.router.navigateByUrl('/rentals');
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}

