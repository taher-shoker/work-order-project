import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeviceModelComponent } from './edit-device-model.component';

describe('EditDeviceModelComponent', () => {
  let component: EditDeviceModelComponent;
  let fixture: ComponentFixture<EditDeviceModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDeviceModelComponent]
    });
    fixture = TestBed.createComponent(EditDeviceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
