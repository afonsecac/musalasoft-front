import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayViewComponent } from './gateway-view.component';

describe('GatewayViewComponent', () => {
  let component: GatewayViewComponent;
  let fixture: ComponentFixture<GatewayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewayViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatewayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
