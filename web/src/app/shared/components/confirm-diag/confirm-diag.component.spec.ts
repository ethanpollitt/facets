import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDiagComponent } from './confirm-diag.component';

describe('ConfirmDiagComponent', () => {
  let component: ConfirmDiagComponent;
  let fixture: ComponentFixture<ConfirmDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDiagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
