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
  selectedRow: number;
  enterSubmission: boolean = false;

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

  onSubmit(){
    const rows = this.getFormArray.controls;
    
    if(this.selectedRow === rows.length - 1){
      this.create();
    } else {
      this.update();
    }
  }

  create(){
    const group = this.getFormGroup(this.getFormArray.length - 1);

    if(group.valid){
      group.markAsPristine();
      const newGroup = this.cloneGroup(group);
      this.getFormArray.push(newGroup);
    }
  }

  update() {
    const group = this.getFormGroup(this.selectedRow);

    if(group.dirty){
      if(group.valid){
        group.markAsPristine();
      }
    }
  }

  cloneGroup(group: FormGroup): FormGroup{
    const newGroup = new FormGroup({});

    Object.keys(group.controls).forEach(name => {
      newGroup.addControl(name, new FormControl('', this.controls.get(name)));
    });

    return newGroup;
  }

  private getFormGroup(index: number): FormGroup{
    return <FormGroup>this.getFormArray.at(index);
  }


  get getFormArray(): FormArray {
    return <FormArray>this.formGroup.get('array');
  }

}
