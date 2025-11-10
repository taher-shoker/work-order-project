import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceTypeComponent } from './add-device-type.component';

describe('AddDeviceTypeComponent', () => {
  let component: AddDeviceTypeComponent;
  let fixture: ComponentFixture<AddDeviceTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDeviceTypeComponent]
    });
    fixture = TestBed.createComponent(AddDeviceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
