import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableFormComponent } from './table-form/table-form.component';
import { ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableFormComponent],
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
    ['Id', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    ['AccountNumber', [Validators.required, Validators.pattern('^[0-9]+$')]],
    ['Email', [Validators.required, Validators.email]],
    ['OrderNumber', [Validators.required, Validators.pattern('^[0-9]+$')]],
    ['Balance', [Validators.required, Validators.pattern('^[0-9]+$')]]
  ])

  demoArray2 = [
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
}
