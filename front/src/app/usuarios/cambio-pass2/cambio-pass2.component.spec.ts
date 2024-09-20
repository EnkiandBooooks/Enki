import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPass2Component } from './cambio-pass2.component';

describe('CambioPass2Component', () => {
  let component: CambioPass2Component;
  let fixture: ComponentFixture<CambioPass2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioPass2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambioPass2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
