/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DesignerService } from './designer.service';

describe('Service: Designer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DesignerService]
    });
  });

  it('should ...', inject([DesignerService], (service: DesignerService) => {
    expect(service).toBeTruthy();
  }));
});
