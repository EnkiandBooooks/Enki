import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login1Component } from './login1.component';

describe('Login1Component', () => {
  let component: Login1Component;
  let fixture: ComponentFixture<Login1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
