import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPass3Component } from './cambio-pass3.component';

describe('CambioPass3Component', () => {
  let component: CambioPass3Component;
  let fixture: ComponentFixture<CambioPass3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioPass3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambioPass3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
