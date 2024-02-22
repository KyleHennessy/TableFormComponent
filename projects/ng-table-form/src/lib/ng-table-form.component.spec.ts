import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTableFormComponent } from './ng-table-form.component';

describe('NgTableFormComponent', () => {
  let component: NgTableFormComponent;
  let fixture: ComponentFixture<NgTableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgTableFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
