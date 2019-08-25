import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Girl.CardComponent } from './girl.card.component';

describe('Girl.CardComponent', () => {
  let component: Girl.CardComponent;
  let fixture: ComponentFixture<Girl.CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Girl.CardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Girl.CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
