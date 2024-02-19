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
  demo1 = new Map<string, ValidatorFn[]>([
    ["Name", [Validators.required]],
    ["Surname", [Validators.required]]
  ])
}
