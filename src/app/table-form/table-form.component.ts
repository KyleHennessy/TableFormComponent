import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
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
  @Input() array?: any[];
  @ViewChildren('firstInput') inputs: QueryList<ElementRef>;
  @Output() rowUpdated = new EventEmitter<any>();
  @Output() rowCreated = new EventEmitter<any>();
  @Output() rowDeleted = new EventEmitter<any>();
  @Output() invalidRow = new EventEmitter<any>();
  formGroup: FormGroup;
  selectedRow: number;
  selectedCol: number;
  validTableForm: boolean = false;
  keydownSubmission: boolean = false;
  tabbed: boolean = false;

  ngOnInit(): void {
    if(!this.controls){
      return;
    }
    
    let formArray = new FormArray([]);
    
    if(this.array){    
      for(const item of this.array){
        const formGroup = new FormGroup({});
        for (const key of Object.keys(item)){
          if(this.controls.has(key)){
            formGroup.addControl(key, new FormControl(item[key], this.controls.get(key)))
          }
        }
        formArray.push(formGroup)
      }
    }

    let emptyRow = new FormGroup({});
    for(const control of this.controls){
      emptyRow.addControl(control[0], new FormControl('', control[1]))
    }

    formArray.push(emptyRow);

    this.formGroup = new FormGroup({
      array: formArray
    })

    this.validTableForm = true;
  }

  ngAfterViewInit(): void {
    this.inputs.changes.subscribe(() => {
      if (this.inputs.last) {
        this.inputs.last.nativeElement.focus();
      }
    })
  }
  onSelectInput(row: number, col: number) {
    this.selectedRow = row;
    this.selectedCol = col;
  }

  onSubmit(source: string) {
    this.tabbed = false;
    const rows = this.getFormArray.controls;

    if (this.selectedRow === rows.length - 1) {
      this.create();
    } else {
      if (source === 'enter') rows[this.selectedRow].markAsDirty();
      this.update();
    }
  }

  onSave(index: number) {
    const group = this.getFormGroup(index);
    if (!group.valid) {
      group.markAllAsTouched();
      this.invalidRow.emit(group.value);
    }
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.escape', ['$event'])
  onEnterKeydown(event) {
    const row = this.getFormGroup(this.selectedRow);
    if (row.valid) {
      this.keydownSubmission = true;
      event.target.blur();
    }
  }

  @HostListener('keydown.tab', ['$event'])
  onTabKeydown(event) {
    this.tabbed = true;
    if (this.selectedRow === this.getFormArray.controls.length - 1 && this.selectedCol === this.controls.size - 1) {
      event.preventDefault();
      event.target.blur();
    }
  }

  onInputBlur() {
    if (this.keydownSubmission) {
      this.keydownSubmission = false;
      this.onSubmit('enter');
    } else {
      if(this.tabbed && this.selectedCol !== this.controls.size - 1){
        this.tabbed = false;
        return;
      }
      this.onSubmit('focusout');
    }

  }

  create() {
    const group = this.getFormGroup(this.getFormArray.length - 1);

    if (group.valid) {
      group.markAsPristine();
      const newGroup = this.cloneGroup(group);
      this.getFormArray.push(newGroup);
      this.rowCreated.emit(group.value);
    }
  }

  update() {
    const group = this.getFormGroup(this.selectedRow);

    if (group.dirty) {
      if (group.valid) {
        group.markAsPristine();
        this.rowUpdated.emit(group.value);
      }
    }
  }

  delete(index) {
    this.rowDeleted.emit(this.getFormGroup(this.selectedRow).value);
    this.getFormArray.removeAt(index);
  }

  cloneGroup(group: FormGroup): FormGroup {
    const newGroup = new FormGroup({});

    for(const control of Object.keys(group.controls)){
      newGroup.addControl(control, new FormControl('', this.controls.get(control)));
    }

    return newGroup;
  }

  private getFormGroup(index: number): FormGroup {
    return <FormGroup>this.getFormArray.at(index);
  }


  get getFormArray(): FormArray {
    return <FormArray>this.formGroup.get('array');
  }

}
