import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubareaViewComponent } from './subarea-view.component';

describe('SubareaViewComponent', () => {
  let component: SubareaViewComponent;
  let fixture: ComponentFixture<SubareaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubareaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubareaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
