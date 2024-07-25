import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiTercerloginComponent } from './mi-tercerlogin.component';

describe('MiTercerloginComponent', () => {
  let component: MiTercerloginComponent;
  let fixture: ComponentFixture<MiTercerloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiTercerloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiTercerloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
