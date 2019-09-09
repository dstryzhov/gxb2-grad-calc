import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FodderPickerComponent } from './fodder-picker.component';

describe('FodderPickerComponent', () => {
  let component: FodderPickerComponent;
  let fixture: ComponentFixture<FodderPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FodderPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FodderPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
