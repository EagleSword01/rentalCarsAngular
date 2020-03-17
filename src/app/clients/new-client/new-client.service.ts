import { Client } from 'src/app/shared/newClient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable()
export class ClientsListService {

  constructor(private http: HttpClient, private firestore: AngularFirestore, private afs: AngularFirestore) {
    this.clients = [];
   }





  clientsChanged = new Subject<Client[]>();
  startedEditing = new Subject<number>();
  private clients: Client[] = [];




  ;
  createClient(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("clients")
        .add( data)
        .then(res => {},
          err => reject(err)
          );
    });
  }
  getClientss() {
    return this.firestore.collection("clients").snapshotChanges();


  }
  deleteClient(data) {
    return this.firestore
      .collection("clients")
      .doc(data.cid)
      .delete();
  }

  getClient(id){
    return this.firestore.collection("clients").doc(id).get();

  }
  editClient(name, address, phone, email, cid) {
    return this.firestore
      .collection("clients")
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
