import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCuartologinComponent } from './mi-cuartologin.component';

describe('MiCuartologinComponent', () => {
  let component: MiCuartologinComponent;
  let fixture: ComponentFixture<MiCuartologinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiCuartologinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiCuartologinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
