import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDiagComponent } from './error-diag.component';

describe('ErrorDiagComponent', () => {
  let component: ErrorDiagComponent;
  let fixture: ComponentFixture<ErrorDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorDiagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
