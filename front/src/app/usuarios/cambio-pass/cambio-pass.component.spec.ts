import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPassComponent } from './cambio-pass.component';

describe('CambioPassComponent', () => {
  let component: CambioPassComponent;
  let fixture: ComponentFixture<CambioPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambioPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
