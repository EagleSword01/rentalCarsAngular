import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarsListService } from '../new-car/new-car.service';
import { FormGroup, FormControl, Validators, FormArray, AsyncValidatorFn, NgForm } from '@angular/forms';



@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  oldCar;
  editForm: FormGroup;
  loadCar = id =>
  this.carsListService
.getCar(id).subscribe(res => {
  this.oldCar= res.data()
  console.log(this.oldCar);
  this.editForm.patchValue({


    'carId': this.oldCar.carId,
    'carName':this.oldCar.carName,
    'licensePlate': this.oldCar.licensePlate,
   'yearPurchased': this.oldCar.yearPurchased,

  });


}


 )


  id: number;


  constructor(private router: Router, private route: ActivatedRoute,   private carsListService: CarsListService) {
  }


  // this.route.paramMap.subscribe(params =>{
  //   const id = +params.get('i');
  //   if(id>=0){
  //     this.getclient(id);
  //   }
  // })

  ngOnInit() {


      let id =this.route.snapshot.paramMap.get('id');

        this.loadCar(id);





    this.editForm = new FormGroup({
      'carId': new FormControl(  Validators.required),
       'carName': new FormControl(  Validators.required),
       'licensePlate': new FormControl( Validators.required),
      'yearPurchased': new FormControl( Validators.required)
    });




  }


  car = {};
  onSubmit() {
    this.editForm.value.car = this.car;




    let carId= this.editForm.value.carId;
    let carName = this.editForm.value.carName;
    let  licensePlate =this.editForm.value.licensePlate;
    let yearPurchased = this.editForm.value.yearPurchased;
    let id =  this.route.snapshot.paramMap.get('id');
    this.carsListService.editCar(carId,carName, licensePlate, yearPurchased, id);

    this.editForm.reset();
    this.router.navigateByUrl('/cars');
  }



}

