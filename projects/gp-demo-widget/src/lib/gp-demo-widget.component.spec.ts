import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpDemoWidgetComponent } from './gp-demo-widget.component';

describe('GpDemoWidgetComponent', () => {
  let component: GpDemoWidgetComponent;
  let fixture: ComponentFixture<GpDemoWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpDemoWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpDemoWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
