import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-table-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './table-form.component.html',
  styleUrl: './table-form.component.scss'
})
export class TableFormComponent implements OnInit, AfterViewInit {
  @Input() controls: Map<string, ValidatorFn[]>;
  @ViewChildren('firstInput') inputs: QueryList<ElementRef>;
  formGroup: FormGroup;
  selectedRow: number;
  selectedCol: number;
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
  
  ngAfterViewInit(): void {
    this.inputs.changes.subscribe(() => {
      if(this.inputs.last){
        this.inputs.last.nativeElement.focus();
      }
    })
  }
  onSelectInput(row:number, col:number){
    this.selectedRow = row;
    this.selectedCol = col;
  }

  onSubmit(source: string){
    const rows = this.getFormArray.controls;

    if(this.selectedRow === rows.length - 1){
      this.create();
    } else {
      if(source === 'enter') rows[this.selectedRow].markAsDirty();
      this.update();
    }
  }

  onSave(index: number){
    const group = this.getFormGroup(index);
    if(!group.valid){
      group.markAllAsTouched();
      alert('Invalid row');
    }
  }

  @HostListener('keydown.enter', ['$event'])
  onEnterKeydown(event) {
    const row = this.getFormGroup(this.selectedRow);
    if(row.valid){
      this.enterSubmission = true;
      event.target.blur();
    }
  }

  @HostListener('keydown.tab', ['$event'])
  onTabKeydown(event){
    if(this.selectedRow === this.getFormArray.controls.length - 1 && this.selectedCol === this.controls.size - 1){
      event.preventDefault();
      event.target.blur();
    }
  }

  onInputBlur() {
    setTimeout(() => {
      if(this.enterSubmission){
        this.enterSubmission = false;
        this.onSubmit('enter');
      } else {
        this.onSubmit('focusout');
      }
    })
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

  delete(index){
    this.getFormArray.removeAt(index);
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
