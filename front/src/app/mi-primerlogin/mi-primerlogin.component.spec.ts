import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPrimerloginComponent } from './mi-primerlogin.component';

describe('MiPrimerloginComponent', () => {
  let component: MiPrimerloginComponent;
  let fixture: ComponentFixture<MiPrimerloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiPrimerloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiPrimerloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
