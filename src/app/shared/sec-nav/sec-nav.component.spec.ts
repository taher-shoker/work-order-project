import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecNavComponent } from './sec-nav.component';

describe('SecNavComponent', () => {
  let component: SecNavComponent;
  let fixture: ComponentFixture<SecNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecNavComponent]
    });
    fixture = TestBed.createComponent(SecNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
