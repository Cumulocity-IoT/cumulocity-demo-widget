import { TestBed } from '@angular/core/testing';

import { GpDemoWidgetService } from './gp-demo-widget.service';

describe('GpDemoWidgetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GpDemoWidgetService = TestBed.get(GpDemoWidgetService);
    expect(service).toBeTruthy();
  });
});
