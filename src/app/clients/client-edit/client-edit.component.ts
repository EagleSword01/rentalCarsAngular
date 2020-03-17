import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsListService } from '../new-client/new-client.service';
import { Client } from 'src/app/shared/newClient.model';
import { FormGroup, FormControl, Validators, FormArray, AsyncValidatorFn, NgForm } from '@angular/forms';



@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  oldClient;
  editForm: FormGroup;
  loadClient = id =>
  this.clientsListService
.getClient(id).subscribe(res => {
  this.oldClient= res.data()
  console.log(this.oldClient);
  this.editForm.patchValue({

    'name': this.oldClient.name,
    'address':this.oldClient.address,
    'phone': this.oldClient.phone,
   'email': this.oldClient.email,

  });


}


 )


  id: number;


  constructor(private router: Router, private route: ActivatedRoute,  private clientsListService: ClientsListService, private slService: ClientsListService) {
  }


  // this.route.paramMap.subscribe(params =>{
  //   const id = +params.get('i');
  //   if(id>=0){
  //     this.getclient(id);
  //   }
  // })

  ngOnInit() {


      let id =this.route.snapshot.paramMap.get('id');

        this.loadClient(id);






    this.editForm = new FormGroup({
      'name': new FormControl(  Validators.required),
       'address': new FormControl(  Validators.required),
       'phone': new FormControl( Validators.required),
      'email': new FormControl( [Validators.required, Validators.email])
    });




  }


  client = {};
  onSubmit() {
    this.editForm.value.client = this.client;




    let name= this.editForm.value.name;
    let address = this.editForm.value.address;
    let  phone =this.editForm.value.phone;
    let email = this.editForm.value.email;
    let id =  this.route.snapshot.paramMap.get('id');
    this.clientsListService.editClient(name,address, phone, email, id);

    this.editForm.reset();
    this.router.navigateByUrl('/clients');
  }



}

