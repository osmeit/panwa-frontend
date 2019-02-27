import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SickComponent } from './sick.component';

describe('SickComponent', () => {
  let component: SickComponent;
  let fixture: ComponentFixture<SickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
