import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradCardComponent } from './grad-card.component';

describe('GradCardComponent', () => {
  let component: GradCardComponent;
  let fixture: ComponentFixture<GradCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
