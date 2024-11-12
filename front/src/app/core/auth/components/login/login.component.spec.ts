import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register0Component } from './register0.component';

describe('Register0Component', () => {
  let component: Register0Component;
  let fixture: ComponentFixture<Register0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register0Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Register0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
