import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTableFormComponent } from './ng-table-form.component';
import { ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('NgTableFormComponent', () => {
  let component: NgTableFormComponent;
  let fixture: ComponentFixture<NgTableFormComponent>;
  let controls = new Map<string, ValidatorFn[]>([
    ['ControlRequired', [Validators.required]],
    ['ControlRequiredMaxLength', [Validators.required, Validators.maxLength(2)]],
    ['ControlMinLength', [Validators.minLength(3)]],
    ['ControlEmail', [Validators.email]],
  ])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgTableFormComponent, ReactiveFormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgTableFormComponent);
    component = fixture.componentInstance;
    component.controls = controls;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create row', () => {
    //Arrange
    spyOn(component.rowCreated, 'emit');
    const formGroup = component.getFormGroup(0);
    formGroup.patchValue({
      ControlRequired: 'required',
      ControlRequiredMaxLength: 'hi',
      ControlMinLength: 'abc',
      ControlEmail: 'test@email.com'
    })

    const initialRowCount = fixture.debugElement.queryAll(By.css('tr')).length;

    //Act
    component.create();
    fixture.detectChanges();

    const finalRowCount = fixture.debugElement.queryAll(By.css('tr')).length;

    //Assert
    expect(component.rowCreated.emit).toHaveBeenCalled();
    expect(finalRowCount).toBe(initialRowCount + 1);
  });

  it('should not create row when group is invalid', () => {
    //Arrange
    spyOn(component.rowCreated, 'emit');
    const formGroup = component.getFormGroup(0);
    formGroup.patchValue({
      ControlRequired: '',
      ControlRequiredMaxLength: '',
      ControlMinLength: '',
      ControlEmail: 'test'
    })

    const initialRowCount = fixture.debugElement.queryAll(By.css('tr')).length;

    //Act
    component.create();
    fixture.detectChanges();

    const finalRowCount = fixture.debugElement.queryAll(By.css('tr')).length;

    //Assert
    expect(component.rowCreated.emit).toHaveBeenCalledTimes(0);
    expect(finalRowCount).toBe(initialRowCount);
  });

  it('should update existing row', () => {
    //Arrange
    spyOn(component.rowCreated, 'emit');
    const value = {
      ControlRequired: 'required',
      ControlRequiredMaxLength: 'hi',
      ControlMinLength: 'abc',
      ControlEmail: 'test@email.com'
    }
    component.create();
    component.selectedRow = 0;

    spyOn(component.rowUpdated, 'emit');
    const formGroup = component.getFormGroup(0);
    formGroup.patchValue({
      ControlRequired: 'requiredchanged',
      ControlRequiredMaxLength: 'my',
      ControlMinLength: 'efg',
      ControlEmail: 'qa@gmail.com'
    });
    formGroup.markAsDirty();

    //Act
    component.update();
    fixture.detectChanges();

    //Assert
    expect(component.rowUpdated.emit).toHaveBeenCalled();
  });

  it('should not update existing row when row invalid', () => {
    //Arrange
    spyOn(component.rowCreated, 'emit');
    const value = {
      ControlRequired: 'required',
      ControlRequiredMaxLength: 'hi',
      ControlMinLength: 'abc',
      ControlEmail: 'test@email.com'
    }
    component.create();
    component.selectedRow = 0;

    spyOn(component.rowUpdated, 'emit');
    const formGroup = component.getFormGroup(0);
    formGroup.patchValue({
      ControlRequired: 'requiredchanged',
      ControlRequiredMaxLength: 'my',
      ControlMinLength: '1',
      ControlEmail: 'test@email.com'
    });
    formGroup.markAsDirty();

    //Act
    component.update();
    fixture.detectChanges();

    //Assert
    expect(component.rowUpdated.emit).toHaveBeenCalledTimes(0);
  });

  it('should delete row', () => {
    //Arrange
    spyOn(component.rowCreated, 'emit');
    const value = {
      ControlRequired: 'required',
      ControlRequiredMaxLength: 'hi',
      ControlMinLength: 'abc',
      ControlEmail: 'test@email.com'
    }

    createRow(value);
    component.selectedRow = 0;
    const initialRowCount = fixture.debugElement.queryAll(By.css('tr')).length;
    
    spyOn(component.rowDeleted, 'emit');

    //Act
    component.delete(0);
    fixture.detectChanges();
    const finalRowCount = fixture.debugElement.queryAll(By.css('tr')).length;

    //Assert
    expect(component.rowDeleted.emit).toHaveBeenCalled();
    expect(finalRowCount).toBe(initialRowCount - 1);
  });

  it('should populate the form array when an array of objects is passed in', () => {
    // Arrange
    component.array = [
      {
        ControlRequired: 'required',
        ControlRequiredMaxLength: 'hi',
        ControlMinLength: 'abc',
        ControlEmail: 'test@email.com'
      },
      {
        ControlRequired: 'test2',
        ControlRequiredMaxLength: 'hi',
        ControlMinLength: '600',
        ControlEmail: 'test2@email.com'
      },
      {
        ControlRequired: 'test3',
        ControlRequiredMaxLength: 'hi',
        ControlMinLength: 'tableform',
        ControlEmail: 'test3@email.com'
      },
    ];
  
    // Act
    component.ngOnInit();
  
    // Assert
    const formArray = component.getFormArray;
    expect(formArray.length).toBe(component.array.length + 1);
    for (let i = 0; i < component.array.length; i++) {
      const formGroup = formArray.at(i);
      for (const [key, value] of Object.entries(component.array[i])) {
        expect(formGroup.get(key).value).toBe(value);
      }
    }
  });

  it('should not populate form array when property names dont exist in controls map', () => {
    // Arrange
    component.array = [
      {
        a: 'required',
        b: 'hi',
        c: 'abc',
        d: 'test@email.com'
      },
      {
        e: 'test2',
        f: 'hi',
        g: '600',
        h: 'test2@email.com'
      },
      {
        i: 'test3',
        j: 'hi',
        k: 'tableform',
        l: 'test3@email.com'
      },
    ];
  
    // Act
    component.ngOnInit();
  
    // Assert
    const formArray = component.getFormArray;
    console.log(formArray);
    expect(formArray.length).toBe(1);
  });
  

  it('should emit invalidRow event when onSave method is called with invalid form', () => {
    //Arrange
    spyOn(component.invalidRow, 'emit');
    
    //Act
    component.onSave(0);

    //Assert
    expect(component.invalidRow.emit).toHaveBeenCalled();
  });

  function createRow(obj: any){
    const formGroup = component.getFormGroup(component.getFormArray.length - 1);
    for(const [key, value] of Object.entries(obj)){
      formGroup.get(key).setValue(value);
    }
    component.create();
    formGroup.markAsDirty();
    fixture.detectChanges();
  }
});
