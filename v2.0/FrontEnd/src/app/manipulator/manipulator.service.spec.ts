/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManipulatorService } from './manipulator.service';

describe('ManipulatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManipulatorService]
    });
  });

  it('should ...', inject([ManipulatorService], (service: ManipulatorService) => {
    expect(service).toBeTruthy();
  }));
});
