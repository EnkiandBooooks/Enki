import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login0Component } from './login0.component';

describe('Login0Component', () => {
  let component: Login0Component;
  let fixture: ComponentFixture<Login0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login0Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
