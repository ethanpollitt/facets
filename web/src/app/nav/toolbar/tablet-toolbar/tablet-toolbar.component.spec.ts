import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletToolbarComponent } from './tablet-toolbar.component';

describe('TabletToolbarComponent', () => {
  let component: TabletToolbarComponent;
  let fixture: ComponentFixture<TabletToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabletToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabletToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
