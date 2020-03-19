
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { AngularFirestore } from "@angular/fire/firestore";

@Injectable()
export class RentalsListService {

  constructor( private firestore: AngularFirestore, private afs: AngularFirestore) {

   }










  ;
  createRental(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("rentals")
        .add( data)
        .then(res => {},
          err => reject(err)
          );
    });
  }
  getRentals() {
    return this.firestore.collection("rentals").snapshotChanges();


  }
  deleteRental(data) {
    return this.firestore
      .collection("rentals")
      .doc(data.cid)
      .delete();
  }

  getRental(id){
    return this.firestore.collection("rentals").doc(id).get();

  }
  editRental(name, address, phone, email, cid) {
    return this.firestore
      .collection("rentals")
      .doc(cid)
      .update( {property: cid, name, address, phone, email });
  }
  // getclients(){
  //   this.db.collection("cities").get().then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //         // doc.data() is never undefined for query doc snapshots
  //         console.log(doc.id, " => ", doc.data());
  //     });
  // });
  // }
}
