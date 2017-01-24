/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManipulatorComponent } from './manipulator.component';

describe('ManipulatorComponent', () => {
  let component: ManipulatorComponent;
  let fixture: ComponentFixture<ManipulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManipulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManipulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
