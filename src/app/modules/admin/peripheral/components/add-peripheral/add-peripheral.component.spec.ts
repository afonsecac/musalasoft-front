import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeripheralComponent } from './add-peripheral.component';

describe('AddPeripheralComponent', () => {
  let component: AddPeripheralComponent;
  let fixture: ComponentFixture<AddPeripheralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPeripheralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPeripheralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
