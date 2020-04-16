import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  myControl2 = new FormControl();
  options2: string[] = [];
  filteredOptions2: Observable<string[]>;
  constructor(
              private afs: AngularFirestore,

    ) { }

  ngOnInit() {
    this.afs.collection<any>('clients').valueChanges().subscribe(data => {
      this.options2 = data.map(a => a.name)
      this.filteredOptions2 = this.myControl2.valueChanges
      .pipe(
        startWith(''),
        map(value2 => this._filter2(value2))
      );
     })

  }

  private _filter2(value2: string): string[] {
    const filterValue2 = value2.toLowerCase();

    return this.options2.filter(option2 => option2.toLowerCase().includes(filterValue2));
  }
}
