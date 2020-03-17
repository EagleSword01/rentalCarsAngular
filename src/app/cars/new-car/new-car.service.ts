
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { AngularFirestore } from "@angular/fire/firestore";

@Injectable()
export class CarsListService {

  constructor( private firestore: AngularFirestore, private afs: AngularFirestore) {
    let cars = [];
   }





  startedEditing = new Subject<number>();





  ;
  createCar(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("cars")
        .add( data)
        .then(res => {},
          err => reject(err)
          );
    });
  }
  getCars() {
    return this.firestore.collection("cars").snapshotChanges();


  }
  deleteCar(data) {
    return this.firestore
      .collection("cars")
      .doc(data.cid)
      .delete();
  }

  getCar(id){
    return this.firestore.collection("cars").doc(id).get();

  }
  editCar(name, address, phone, email, cid) {
    return this.firestore
      .collection("cars")
      .doc(cid)
      .update( {property: cid, name, address, phone, email });
  }

}
