import { Component } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { NgTableFormComponent } from 'ng-table-form';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgTableFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  lastRowCreated: string;
  lastRowUpdated: string;
  lastRowDeleted: string;
  demo1 = new Map<string, ValidatorFn[]>([
    ["Name", [Validators.required]],
    ["Surname", [Validators.required]]
  ])

  demo2 = new Map<string, ValidatorFn[]>([
    ["Name", [Validators.required]],
    ["Phone", [Validators.required]],
    ["Email", [Validators.required, Validators.email]],
    ["Address", [Validators.required]]
  ]);

  demo3 = new Map<string, ValidatorFn[]>([
    ["control1", [Validators.required]],
    ["control2", [Validators.required]],
    ["control3", [Validators.required]],
    ["control4", [Validators.required]],
    ["control5", [Validators.required]],
    ["control6", [Validators.required]],
    ["control7", [Validators.required]],
    ["control8", [Validators.required]],
    ["control9", [Validators.required]],
    ["control10", [Validators.required]],
    ["control11", [Validators.required]],
    ["control12", [Validators.required]],
    ["control13", [Validators.required]],
    ["control14", [Validators.required]],
    ["control15", [Validators.required]],
    ["control16", [Validators.required]],
    ["control17", [Validators.required]],
    ["control18", [Validators.required]],
    ["control19", [Validators.required]],
    ["control20", [Validators.required]],
    ["control21", [Validators.required]],
    ["control22", [Validators.required]],
    ["control23", [Validators.required]],
    ["control24", [Validators.required]],
    ["control25", [Validators.required]],
    ["control26", [Validators.required]],
    ["control27", [Validators.required]],
    ["control28", [Validators.required]],
    ["control29", [Validators.required]],
    ["control30", [Validators.required]],
  ])

  demo4 = new Map<string, ValidatorFn[]>([
    ['Id', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    ['AccountNumber', [Validators.required, Validators.pattern('^[0-9]+$')]],
    ['Email', [Validators.required, Validators.email]],
    ['OrderNumber', [Validators.required, Validators.pattern('^[0-9]+$')]],
    ['Balance', [Validators.required, Validators.pattern('^[0-9]+$')]]
  ])

  demoArray = [
    {
      Id: 'ABCDE',
      AccountNumber: '12345',
      Email: 'joe@email.com',
      OrderNumber: '1',
      Balance: '50',
    },
    {
      Id: 'FGHIJ',
      AccountNumber: '67891',
      Email: 'john@email.com',
      OrderNumber: '8',
      Balance: '12',
    },
    {
      Id: 'KLMNOP',
      AccountNumber: '82937',
      Email: 'jane@email.com',
      OrderNumber: '90',
      Balance: '01',
    }
  ]

  onRowCreated(event){
    this.lastRowCreated = JSON.stringify(event);
  }

  onRowUpdated(event){
    this.lastRowUpdated = JSON.stringify(event);
  }

  onRowDeleted(event){
    this.lastRowDeleted = JSON.stringify(event)
  }

  onInvalidRow(event){
    alert('Invalid row');
  }
}
