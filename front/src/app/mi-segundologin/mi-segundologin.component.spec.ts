import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiSegundologinComponent } from './mi-segundologin.component';

describe('MiSegundologinComponent', () => {
  let component: MiSegundologinComponent;
  let fixture: ComponentFixture<MiSegundologinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiSegundologinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiSegundologinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
