import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RentalsListService } from '../new-rental/new-rental.service';
import { FormGroup, FormControl, Validators, FormArray, AsyncValidatorFn, NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatTableDataSource} from '@angular/material/table';
import { MatMomentDateModule, MomentDateAdapter } from "@angular/material-moment-adapter";
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
  oldRental;
  clientss;
  cars;
  clientName = new FormControl('', Validators.required);
    carId = new FormControl('', Validators.required);

  editForm: FormGroup;
  loadRental = id =>
  this.rentalsListService
.getRental(id).subscribe(res => {
  this.oldRental= res.data()
  console.log(this.oldRental);
  this.editForm.patchValue({

    'contractNumber': this.oldRental.contractNumber,



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


      let id =this.route.snapshot.paramMap.get('id');

        this.loadRental(id);





    this.editForm = new FormGroup({
      carId: new FormControl(  Validators.required),
      clientName: new FormControl(  Validators.required),
      contractNumber: new FormControl( Validators.required),
      startDate: new FormControl( Validators.required),
      phone: new FormControl( Validators.required ),
      email: new FormControl([Validators.required, Validators.email]),
    });

this.afs.collection<any>('clients').valueChanges().subscribe(data => {
     this.clientss = data
    })
    this.afs.collection<any>('cars').valueChanges().subscribe(data => {
      this.cars = data
     })


  }


  rental = {};
  onSubmit() {
    this.editForm.value.rental = this.rental;




    let carId= this.editForm.value.carId;
    let carName = this.editForm.value.carName;
    let  licensePlate =this.editForm.value.licensePlate;
    let yearPurchased = this.editForm.value.yearPurchased;
    let id =  this.route.snapshot.paramMap.get('id');
    this.rentalsListService.editRental(carId,carName, licensePlate, yearPurchased, id);

    this.editForm.reset();
    this.router.navigateByUrl('/cars');
  }



}
