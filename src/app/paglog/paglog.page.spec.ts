import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaglogPage } from './paglog.page';

describe('PaglogPage', () => {
  let component: PaglogPage;
  let fixture: ComponentFixture<PaglogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaglogPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaglogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
