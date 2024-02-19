import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-table-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './table-form.component.html',
  styleUrl: './table-form.component.scss'
})
export class TableFormComponent implements OnInit {
  @Input() controls: Map<string, ValidatorFn[]>;
  formGroup: FormGroup;

  ngOnInit(): void {
    if (!this.controls) {
      return;
    }

    let array: FormArray;

    const group = new FormGroup({});

    for (const control of this.controls) {
      group.addControl(control[0], new FormControl('', control[1]))
    }

    array = new FormArray([
      group
    ]);

    this.formGroup = new FormGroup({
      array
    })
  }

  get getFormArray(): FormArray {
    return <FormArray>this.formGroup.get('array');
  }

}
